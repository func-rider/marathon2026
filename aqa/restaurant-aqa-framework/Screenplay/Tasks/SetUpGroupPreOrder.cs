using Restaurant_Aqa_Framework.Api;
using Restaurant_Aqa_Framework.Api.Dtos.Auth;
using Restaurant_Aqa_Framework.Api.Dtos.Dishes;
using Restaurant_Aqa_Framework.Api.Dtos.GroupOrders;
using Restaurant_Aqa_Framework.Api.Dtos.Reservations;
using Restaurant_Aqa_Framework.Api.Dtos.Tables;
using Restaurant_Aqa_Framework.Api.Seeding;
using Restaurant_Aqa_Framework.Screenplay.Questions;
using Restaurant_Aqa_Framework.Support;

namespace Restaurant_Aqa_Framework.Screenplay.Tasks;

/// <summary>Creates an Owner, a fresh reservation and invitation, and one available dish for this scenario.
/// Existing location/table/dish tasks own their own cleanup; the reservation is cancelled after guest sessions
/// are removed. Cognito users and Owner sessions have no delete endpoint and remain marked with the AQA prefix.</summary>
public sealed class SetUpGroupPreOrder(
    string locationName = "group pre-order location",
    bool createReservationAsWaiter = false,
    string fixtureName = "primary group") : ITask
{
    public async Task PerformAsAsync(Actor actor)
    {
        // Fail before creating anything when this clone has no cleanup-capable Waiter account configured.
        var waiter = await actor.AsksForAsync(new TheWaiterSession());

        await actor.AttemptsToAsync(
            new SetUpLocation(name: locationName),
            new AddTable(seats: 6, toLocation: locationName),
            new AddDish(toLocation: locationName));

        var owner = SampleDataFactory.RegisterRequest();
        var authApi = new AuthApi(actor.UsingTheApi());
        await CaptureAndRequireSuccessAsync(actor, await authApi.RegisterAsync(owner), "Registering the Owner");
        await CaptureAndRequireSuccessAsync(
            actor,
            await authApi.SignInAsync(new SignInRequest(owner.Email, owner.Password)),
            "Signing in as the Owner");
        var ownerToken = actor.TheLastResponse().Json<SignInResponse>().IdToken;

        var table = actor.Recall<TableResponse>();
        var reservationApi = new ReservationsApi(actor.UsingTheApi());
        var startTime = DateTime.UtcNow.AddHours(2);
        var reservationRequest = SampleDataFactory.CreateReservationRequest(table.Id, startTime, guestCount: 5) with
        {
            CustomerEmail = createReservationAsWaiter ? owner.Email : null,
        };
        await CaptureAndRequireSuccessAsync(
            actor,
            await reservationApi.CreateReservationAsync(
                reservationRequest,
                createReservationAsWaiter ? waiter.IdToken : ownerToken),
            "Creating the Owner's reservation");
        var reservation = actor.TheLastResponse().Json<ReservationResponse>();

        actor.Recall<CleanupScope>().TrackDelete(
            $"cancel reservation:{reservation.Id}",
            () => reservationApi.CancelReservationAsync(reservation.Id, ownerToken));

        var groupApi = new GroupOrdersApi(actor.UsingTheApi());
        await CaptureAndRequireSuccessAsync(
            actor,
            await groupApi.GetInviteTokenAsync(reservation.Id, ownerToken),
            "Getting the group invitation");
        var token = actor.TheLastResponse().Json<GroupInviteTokenResponse>().Token;

        await CaptureAndRequireSuccessAsync(
            actor,
            await groupApi.GetInviteAsync(token),
            "Opening the group invitation");
        var invitation = actor.TheLastResponse().Json<GroupInviteResponse>();

        actor.Remember(fixtureName, new GroupOrderFixture(
            owner,
            ownerToken,
            reservation,
            invitation,
            actor.Recall<DishResponse>()));
    }

    private static async Task CaptureAndRequireSuccessAsync(
        Actor actor, Microsoft.Playwright.IAPIResponse response, string operation)
    {
        await actor.TheLastResponse().CaptureAsync(response);
        if (!actor.TheLastResponse().Succeeded)
            throw new InvalidOperationException(
                $"{operation} failed with {actor.TheLastResponse().Status}: {actor.TheLastResponse().Body}");
    }
}
