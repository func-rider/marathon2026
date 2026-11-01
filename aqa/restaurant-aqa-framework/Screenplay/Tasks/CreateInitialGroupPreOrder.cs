using Restaurant_Aqa_Framework.Api;
using Restaurant_Aqa_Framework.Api.Dtos.Orders;
using Restaurant_Aqa_Framework.Api.Seeding;
using Restaurant_Aqa_Framework.Support;

namespace Restaurant_Aqa_Framework.Screenplay.Tasks;

/// <summary>Creates a pre-order through the customer's supported orders API and registers its cancellation for cleanup.</summary>
public sealed class CreateInitialGroupPreOrder : ITask
{
    public async Task PerformAsAsync(Actor actor)
    {
        var fixture = actor.Recall<GroupOrderFixture>();
        var orders = new OrdersApi(actor.UsingTheApi());
        var response = await orders.CreateOrderAsync(
            new CreateOrderRequest(fixture.Reservation.Id, [new OrderItemRequest(fixture.Dish.Id, 1)]),
            fixture.OwnerIdToken);
        await actor.TheLastResponse().CaptureAsync(response);
        if (!actor.TheLastResponse().Succeeded)
            throw new InvalidOperationException(
                $"Creating the initial group pre-order failed with {actor.TheLastResponse().Status}: {actor.TheLastResponse().Body}");

        actor.Recall<CleanupScope>().TrackDelete(
            $"cancel initial pre-order:{fixture.Reservation.Id}",
            () => orders.DeleteOrderAsync(fixture.Reservation.Id, fixture.OwnerIdToken));
    }
}
