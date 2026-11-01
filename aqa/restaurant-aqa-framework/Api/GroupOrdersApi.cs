using Microsoft.Playwright;
using Restaurant_Aqa_Framework.Api.Dtos.GroupOrders;

namespace Restaurant_Aqa_Framework.Api;

/// <summary>Preparation and read APIs for the Owner's group pre-order review flow.</summary>
public sealed class GroupOrdersApi(IAPIRequestContext api) : ApiClientBase(api)
{
    public Task<IAPIResponse> GetInviteTokenAsync(string reservationId, string? bearerToken = null) =>
        GetAsync(Url($"/reservations/{Uri.EscapeDataString(reservationId)}/invite-token"),
            new APIRequestContextOptions { Headers = Headers(bearerToken) });

    public Task<IAPIResponse> GetInviteAsync(string token) =>
        GetAsync(Url($"/guest/invites/{Uri.EscapeDataString(token)}"));

    public Task<IAPIResponse> CreateGuestSessionAsync(CreateGuestSessionRequest request) =>
        Api.PostAsync(Url("/guest/sessions"), new APIRequestContextOptions
        {
            DataString = Serialize(request),
            Headers = Headers(),
        });

    public Task<IAPIResponse> AddDishAsync(
        string guestSessionId, string dishId, int quantity, string guestSessionToken) =>
        Api.PostAsync(Url($"/guest/sessions/{Uri.EscapeDataString(guestSessionId)}/dishes"), new APIRequestContextOptions
        {
            DataString = Serialize(new AddGuestDishRequest(dishId, quantity)),
            Headers = Headers(guestSessionToken),
        });

    public Task<IAPIResponse> SubmitCartAsync(string guestSessionId, string guestSessionToken) =>
        Api.PostAsync(Url($"/guest/sessions/{Uri.EscapeDataString(guestSessionId)}/submit"), new APIRequestContextOptions
        {
            Headers = Headers(guestSessionToken),
        });

    public Task<IAPIResponse> GetOwnerSessionIdAsync(string reservationId, string ownerToken) =>
        GetAsync(Url($"/reservations/{Uri.EscapeDataString(reservationId)}/guest-session-id"),
            new APIRequestContextOptions { Headers = Headers(ownerToken) });

    public Task<IAPIResponse> GetGroupSessionsAsync(string groupReservationId, string? bearerToken = null) =>
        GetAsync(Url($"/guest/groups/{Uri.EscapeDataString(groupReservationId)}/sessions"),
            new APIRequestContextOptions { Headers = Headers(bearerToken) });

    public Task<IAPIResponse> GetGroupStatusAsync(string groupReservationId) =>
        GetAsync(Url($"/guest/groups/{Uri.EscapeDataString(groupReservationId)}/status"));

    public Task<IAPIResponse> DeleteGuestSessionAsync(
        string groupReservationId, string guestSessionId, string ownerToken) =>
        DeleteAsync(
            Url($"/guest/groups/{Uri.EscapeDataString(groupReservationId)}/sessions/{Uri.EscapeDataString(guestSessionId)}"),
            new APIRequestContextOptions { Headers = Headers(ownerToken) });
}
