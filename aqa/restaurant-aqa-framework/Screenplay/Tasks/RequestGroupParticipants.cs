using Microsoft.Playwright;
using Restaurant_Aqa_Framework.Api;
using Restaurant_Aqa_Framework.Api.Dtos.Auth;
using Restaurant_Aqa_Framework.Api.Seeding;
using Restaurant_Aqa_Framework.Screenplay.Questions;
using Restaurant_Aqa_Framework.Support;

namespace Restaurant_Aqa_Framework.Screenplay.Tasks;

/// <summary>Requests the guest snapshot as the Owner or as a named non-owner identity for authorization coverage.</summary>
public sealed class RequestGroupParticipants(string viewer, bool groupExists = true) : ITask
{
    public async Task PerformAsAsync(Actor actor)
    {
        var fixture = actor.Recall<GroupOrderFixture>();
        string? token = viewer.ToLowerInvariant() switch
        {
            "the owner" => fixture.OwnerIdToken,
            "another customer" => await CreateAnotherCustomerTokenAsync(actor),
            "a guest" => LastGuestSession(actor)?.SessionToken
                ?? throw new InvalidOperationException("This scenario has not joined a guest to the group."),
            "a waiter" => (await actor.AsksForAsync(new TheWaiterSession())).IdToken,
            "an unauthenticated visitor" => null,
            _ => throw new InvalidOperationException($"Unsupported group-order viewer '{viewer}'."),
        };

        var groupReservationId = groupExists
            ? fixture.Invitation.GroupReservationId
            : $"AQA-Sample-missing-{Guid.NewGuid():N}";
        var response = await new GroupOrdersApi(actor.UsingTheApi())
            .GetGroupSessionsAsync(groupReservationId, token);
        await actor.TheLastResponse().CaptureAsync(response);
    }

    private static async Task<string> CreateAnotherCustomerTokenAsync(Actor actor)
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

    private static GuestSessionFixture? LastGuestSession(Actor actor)
    {
        var guests = actor.RecallAll<GuestSessionFixture>();
        return guests.Count == 0 ? null : guests[^1];
    }

    private static async Task CaptureAndRequireSuccessAsync(Actor actor, IAPIResponse response, string operation)
    {
        await actor.TheLastResponse().CaptureAsync(response);
        if (!actor.TheLastResponse().Succeeded)
            throw new InvalidOperationException(
                $"{operation} failed with {actor.TheLastResponse().Status}: {actor.TheLastResponse().Body}");
    }
}
