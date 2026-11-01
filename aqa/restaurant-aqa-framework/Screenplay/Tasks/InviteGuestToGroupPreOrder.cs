using Microsoft.Playwright;
using Restaurant_Aqa_Framework.Api;
using Restaurant_Aqa_Framework.Api.Dtos.GroupOrders;
using Restaurant_Aqa_Framework.Api.Seeding;
using Restaurant_Aqa_Framework.Screenplay;
using Restaurant_Aqa_Framework.Support;

namespace Restaurant_Aqa_Framework.Screenplay.Tasks;

/// <summary>Accepts the scenario's invitation as a guest, optionally adds the seeded dish, and optionally submits
/// the cart. New sessions are registered for Owner cleanup immediately after creation succeeds.</summary>
public sealed class InviteGuestToGroupPreOrder(string guestName, int dishQuantity = 0, bool submitCart = false) : ITask
{
    public async Task PerformAsAsync(Actor actor)
    {
        if (dishQuantity < 0)
            throw new InvalidOperationException("Dish quantity cannot be negative.");

        var fixture = actor.Recall<GroupOrderFixture>();
        var api = new GroupOrdersApi(actor.UsingTheApi());
        var displayName = $"{SampleDataFactory.Prefix}{guestName}-{Guid.NewGuid():N}";
        await CaptureAndRequireSuccessAsync(
            actor,
            await api.CreateGuestSessionAsync(
                new CreateGuestSessionRequest(fixture.Invitation.GroupReservationId, displayName)),
            $"Joining the group as {guestName}");

        var created = actor.TheLastResponse().Json<CreateGuestSessionResponse>();
        actor.Recall<CleanupScope>().TrackDelete(
            $"guest session:{displayName}",
            () => api.DeleteGuestSessionAsync(
                fixture.Invitation.GroupReservationId,
                created.SessionId,
                fixture.OwnerIdToken));

        var guest = new GuestSessionFixture(displayName, created.SessionId, created.SessionToken, 0, false);
        actor.Remember(guestName, guest);

        if (dishQuantity > 0)
        {
            await CaptureAndRequireSuccessAsync(
                actor,
                await api.AddDishAsync(created.SessionId, fixture.Dish.Id, dishQuantity, created.SessionToken),
                $"Adding dishes to {guestName}'s cart");
            guest = guest with { DishQuantity = dishQuantity };
            actor.Remember(guestName, guest);
        }

        if (!submitCart)
            return;

        if (dishQuantity == 0)
            throw new InvalidOperationException("An empty guest cart cannot be submitted.");

        await CaptureAndRequireSuccessAsync(
            actor,
            await api.SubmitCartAsync(created.SessionId, created.SessionToken),
            $"Submitting {guestName}'s cart");
        actor.Remember(guestName, guest with { IsSubmitted = true });
    }

    private static async Task CaptureAndRequireSuccessAsync(Actor actor, IAPIResponse response, string operation)
    {
        await actor.TheLastResponse().CaptureAsync(response);
        if (!actor.TheLastResponse().Succeeded)
            throw new InvalidOperationException(
                $"{operation} failed with {actor.TheLastResponse().Status}: {actor.TheLastResponse().Body}");
    }
}
