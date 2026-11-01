using Restaurant_Aqa_Framework.Api;
using Restaurant_Aqa_Framework.Api.Dtos.GroupOrders;
using Restaurant_Aqa_Framework.Api.Dtos.Orders;
using Restaurant_Aqa_Framework.Screenplay.Questions;
using Restaurant_Aqa_Framework.Support;

namespace Restaurant_Aqa_Framework.Screenplay.Tasks;

/// <summary>Reads the submitted reservation order and group status as a waiter.</summary>
public sealed class RequestConfirmedGroupOrder : ITask
{
    public async Task PerformAsAsync(Actor actor)
    {
        var fixture = actor.Recall<GroupOrderFixture>();
        var waiter = await actor.AsksForAsync(new TheWaiterSession());
        var response = await new OrdersApi(actor.UsingTheApi())
            .GetOrderAsync(fixture.Reservation.Id, waiter.IdToken);
        await actor.TheLastResponse().CaptureAsync(response);
        if (!actor.TheLastResponse().Succeeded)
            throw new InvalidOperationException(
                $"The waiter could not read the confirmed order: {actor.TheLastResponse().Status}: {actor.TheLastResponse().Body}");
        actor.Remember(await response.ReadAsAsync<GetOrderResponse>());

        var statusResponse = await new GroupOrdersApi(actor.UsingTheApi())
            .GetGroupStatusAsync(fixture.Invitation.GroupReservationId);
        await actor.TheLastResponse().CaptureAsync(statusResponse);
        if (!actor.TheLastResponse().Succeeded)
            throw new InvalidOperationException(
                $"The group status could not be read: {actor.TheLastResponse().Status}: {actor.TheLastResponse().Body}");
        actor.Remember(await statusResponse.ReadAsAsync<GroupStatusResponse>());
    }
}
