using Restaurant_Aqa_Framework.Api;
using Restaurant_Aqa_Framework.Api.Dtos.Auth;
using Restaurant_Aqa_Framework.Api.Dtos.GroupOrders;
using Restaurant_Aqa_Framework.Api.Seeding;
using Restaurant_Aqa_Framework.Screenplay.Questions;
using Restaurant_Aqa_Framework.Support;

namespace Restaurant_Aqa_Framework.Screenplay.Tasks;

/// <summary>Requests deletion of a real participant, a foreign group's participant, or a known missing session.</summary>
public sealed class DeleteGroupParticipant(
    string guestName,
    string viewer = "the owner",
    string ownerGroupFixtureName = "primary group",
    bool participantExists = true,
    bool participantMustBelongToAnotherGroup = false) : ITask
{
    private const string MissingGuestSessionId = "AQA-Sample-missing-guest-session";

    public async Task PerformAsAsync(Actor actor)
    {
        var group = actor.Recall<GroupOrderFixture>(ownerGroupFixtureName);
        var guest = participantExists ? actor.Recall<GuestSessionFixture>(guestName) : null;
        if (participantMustBelongToAnotherGroup &&
            guest!.GroupReservationId == group.Invitation.GroupReservationId)
        {
            throw new InvalidOperationException("The cross-group deletion scenario did not create two independent groups.");
        }

        var sessionId = guest?.SessionId ?? MissingGuestSessionId;
        string? token = viewer.ToLowerInvariant() switch
        {
            "the owner" => group.OwnerIdToken,
            "another customer" => await RegisterAnotherCustomerAsync(actor),
            "a waiter" => (await actor.AsksForAsync(new TheWaiterSession())).IdToken,
            "an unauthenticated visitor" => null,
            _ => throw new InvalidOperationException($"Unsupported group participant remover '{viewer}'."),
        };

        var response = await new GroupOrdersApi(actor.UsingTheApi())
            .DeleteGuestSessionAsync(group.Invitation.GroupReservationId, sessionId, token);

        await actor.TheLastResponse().CaptureAsync(response);
        if (!actor.TheLastResponse().Succeeded || guest is null)
            return;

        var snapshot = await response.ReadAsAsync<GroupSessionsResponse>();
        actor.Remember("group removal snapshot", snapshot);
        actor.Recall<CleanupRegistration>($"guest cleanup:{guestName}").Disarm();
        actor.Remember(guestName, guest with { IsRemoved = true });
    }

    private static async Task<string> RegisterAnotherCustomerAsync(Actor actor)
    {
        var auth = new AuthApi(actor.UsingTheApi());
        var request = SampleDataFactory.RegisterRequest();
        await CaptureAndRequireSuccessAsync(actor, await auth.RegisterAsync(request), "Registering another customer");
        await CaptureAndRequireSuccessAsync(
            actor,
            await auth.SignInAsync(new SignInRequest(request.Email, request.Password)),
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
