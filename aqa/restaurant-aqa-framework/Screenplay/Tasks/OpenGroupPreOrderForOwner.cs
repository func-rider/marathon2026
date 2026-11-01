using Restaurant_Aqa_Framework.Support;
using Restaurant_Aqa_Framework.Ui;

namespace Restaurant_Aqa_Framework.Screenplay.Tasks;

/// <summary>Signs in the Owner through the storefront and opens the reservation's group pre-order page.</summary>
public sealed class OpenGroupPreOrderForOwner : ITask
{
    public async Task PerformAsAsync(Actor actor)
    {
        var fixture = actor.Recall<GroupOrderFixture>();
        await actor.AttemptsToAsync(new SignInThroughTheLoginForm(fixture.Owner.Email, fixture.Owner.Password));

        var page = new GroupOrderPage(actor.LookingAtThePage());
        await page.NavigateAsync(fixture.Reservation.Id);
        await page.WaitForLoadedAsync();
    }
}
