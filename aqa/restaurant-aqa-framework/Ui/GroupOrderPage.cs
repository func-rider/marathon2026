using Microsoft.Playwright;

namespace Restaurant_Aqa_Framework.Ui;

/// <summary>Owner's group pre-order review page. Locators follow the headings and accessible roles
/// exposed by the participant cards; CSS is used only for totals that currently have no semantic label.</summary>
public sealed class GroupOrderPage(IPage page) : BasePage(page)
{
    public ILocator Title => Page.GetByRole(AriaRole.Heading, new() { Name = "Group Pre-Order", Exact = true });

    public ILocator ParticipantCard(string guestName) =>
        Page.GetByRole(AriaRole.Listitem).Filter(new LocatorFilterOptions
        {
            Has = Page.GetByRole(AriaRole.Heading, new() { Name = $"Guest: {guestName}", Exact = true }),
        });

    public static ILocator CartStatus(ILocator participantCard) => participantCard.GetByRole(AriaRole.Status);

    public static ILocator Dish(ILocator participantCard, string dishName) =>
        participantCard.GetByText(dishName, new() { Exact = true });

    public static ILocator Quantity(ILocator participantCard, int quantity) =>
        participantCard.GetByRole(AriaRole.Group, new() { Name = $"Quantity: {quantity}", Exact = true });

    public static ILocator NoDishes(ILocator participantCard) =>
        participantCard.GetByText("No dishes yet", new() { Exact = true });

    public static ILocator Subtotal(ILocator participantCard) => participantCard.Locator(".subtotal");

    public ILocator GrandTotal => Page.Locator(".grand-total");

    public ILocator EmptyGroupMessage =>
        Page.GetByText("Participants haven't added any dishes yet", new() { Exact = true });

    public ILocator SubmitPreOrderButton =>
        Page.GetByRole(AriaRole.Button, new() { Name = "Submit Pre-Order", Exact = true });

    public ILocator ConfirmSubmitButton =>
        Page.GetByRole(AriaRole.Button, new() { Name = "Submit", Exact = true });

    public ILocator SubmittedMessage =>
        Page.GetByRole(AriaRole.Status).GetByText("This group pre-order has been submitted.", new() { Exact = true });

    public Task NavigateAsync(string reservationId) =>
        NavigateToAsync($"/reservations/{Uri.EscapeDataString(reservationId)}/group-order");

    public Task WaitForLoadedAsync() => Page.Locator(".participants-section").WaitForAsync();

    public Task RefreshAsync() =>
        Page.GetByRole(AriaRole.Button, new() { Name = "Refresh", Exact = true }).ClickAsync();

    public async Task SubmitPreOrderAsync()
    {
        await SubmitPreOrderButton.ClickAsync();
        await ConfirmSubmitButton.ClickAsync();
    }

    public Task<string> VisibleTextAsync() => Page.Locator(".group-order-panel").InnerTextAsync();
}
