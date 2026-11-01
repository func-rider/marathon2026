using Restaurant_Aqa_Framework.Api;
using Restaurant_Aqa_Framework.Api.Dtos.Auth;
using Restaurant_Aqa_Framework.Api.Dtos.GroupOrders;
using Restaurant_Aqa_Framework.Api.Seeding;
using Restaurant_Aqa_Framework.Support;

namespace Restaurant_Aqa_Framework.Screenplay.Tasks;

/// <summary>Attempts group submission as the Owner or another customer. Failure responses remain available to Then steps.</summary>
public sealed class SubmitGroupPreOrder(string viewer, bool groupExists = true) : ITask
{
    public async Task PerformAsAsync(Actor actor)
    {
        var fixture = actor.Recall<GroupOrderFixture>();
        string token = viewer.ToLowerInvariant() switch
        {
            "the owner" => fixture.OwnerIdToken,
            "another customer" => await RegisterAnotherCustomerAsync(actor),
            _ => throw new InvalidOperationException($"Unsupported group pre-order submitter '{viewer}'."),
        };
        var groupId = groupExists
            ? fixture.Invitation.GroupReservationId
            : $"AQA-Sample-missing-{Guid.NewGuid():N}";

        var response = await new GroupOrdersApi(actor.UsingTheApi())
            .SubmitGroupPreOrderAsync(groupId, fixture.Reservation.Id, token);
        await actor.TheLastResponse().CaptureAsync(response);

        if (actor.TheLastResponse().Succeeded)
        {
            var submittedDishes = await response.ReadAsAsync<List<SubmittedDishResponse>>();
            actor.Remember("submitted group dishes", submittedDishes);
        }
    }

    private static async Task<string> RegisterAnotherCustomerAsync(Actor actor)
    {
        var auth = new AuthApi(actor.UsingTheApi());
        var customer = SampleDataFactory.RegisterRequest();
        await CaptureAndRequireSuccessAsync(actor, await auth.RegisterAsync(customer), "Registering another customer");
        await CaptureAndRequireSuccessAsync(
            actor,
            await auth.SignInAsync(new SignInRequest(customer.Email, customer.Password)),
            "Signing in as another customer");
        return actor.TheLastResponse().Json<SignInResponse>().IdToken;
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
