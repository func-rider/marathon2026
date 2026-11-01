using Microsoft.Playwright;
using Restaurant_Aqa_Framework.Api;
using Restaurant_Aqa_Framework.Support;

namespace Restaurant_Aqa_Framework.Screenplay.Tasks;

/// <summary>Adds another serving of the scenario's sample dish to a guest's still-open cart.</summary>
public sealed class ChangeGuestPreOrderCart(string guestName, int additionalQuantity = 1) : ITask
{
    public async Task PerformAsAsync(Actor actor)
    {
        if (additionalQuantity <= 0)
            throw new InvalidOperationException("Additional quantity must be positive.");

        var fixture = actor.Recall<GroupOrderFixture>();
        var guest = actor.Recall<GuestSessionFixture>(guestName);
        var api = new GroupOrdersApi(actor.UsingTheApi());
        var response = await api.AddDishAsync(guest.SessionId, fixture.Dish.Id, additionalQuantity, guest.SessionToken);
        await actor.TheLastResponse().CaptureAsync(response);
        if (!actor.TheLastResponse().Succeeded)
            throw new InvalidOperationException(
                $"Changing {guestName}'s cart failed with {actor.TheLastResponse().Status}: {actor.TheLastResponse().Body}");

        actor.Remember(guestName, guest with { DishQuantity = guest.DishQuantity + additionalQuantity });
    }
}
