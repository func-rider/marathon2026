using Microsoft.Playwright;
using Restaurant_Aqa_Framework.Ui.Components;

namespace Restaurant_Aqa_Framework.Ui;

/// <summary>The configured waiter's assigned reservation list and its supported pre-order navigation.</summary>
public sealed class WaiterReservationsPage(IPage page) : BasePage(page)
{
    public Task NavigateAsync() => NavigateToAsync("/waiter-reservations");

    public ReservationCardComponent ReservationByAddress(string address) =>
        new(Page.GetByRole(AriaRole.Listitem).Filter(new LocatorFilterOptions { HasText = address }));
}
