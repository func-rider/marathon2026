using Restaurant_Aqa_Framework.Support;
using Restaurant_Aqa_Framework.Ui;

namespace Restaurant_Aqa_Framework.Screenplay.Tasks;

/// <summary>Signs in the configured waiter and follows the assigned reservation card to its pre-order page.</summary>
public sealed class OpenConfirmedOrderAsWaiter : ITask
{
    public async Task PerformAsAsync(Actor actor)
    {
        var fixture = actor.Recall<GroupOrderFixture>();
        await actor.AttemptsToAsync(new SignInAsWaiterThroughTheUi());

        var reservations = new WaiterReservationsPage(actor.LookingAtThePage());
        await reservations.NavigateAsync();
        await reservations.ReservationByAddress(fixture.Reservation.LocationAddress).PreOrderAsync();

        var orderPage = new WaiterPreOrderPage(actor.LookingAtThePage());
        await orderPage.WaitForDishAsync(fixture.Dish.Name);
    }
}
