using Microsoft.Playwright;

namespace Restaurant_Aqa_Framework.Ui;

/// <summary>The waiter's pre-order page reached from an assigned reservation card.</summary>
public sealed class WaiterPreOrderPage(IPage page) : BasePage(page)
{
    public ILocator Title => Page.GetByRole(AriaRole.Heading, new() { NameRegex = new("^Pre-order of ") });

    public ILocator OrderItems => Page.Locator(".preorder-list .pre-order-dish");

    public ILocator DishItem(string dishName) =>
        OrderItems.Filter(new LocatorFilterOptions
        {
            Has = Page.GetByText(dishName, new() { Exact = true }),
        });

    public static ILocator Quantity(ILocator dishItem) => dishItem.Locator(".pre-order-quantity");

    public Task WaitForDishAsync(string dishName) => DishItem(dishName).WaitForAsync();

    public Task<string> VisibleTextAsync() => Page.Locator(".preorder-list").InnerTextAsync();
}
