using Restaurant_Aqa_Framework.Api.Dtos.Dishes;

namespace Restaurant_Aqa_Framework.Screenplay.Tasks;

/// <summary>Creates an independently identifiable dish in the scenario's seeded location.</summary>
public sealed class CreateSeparateGroupDish(
    string locationName = "group pre-order location",
    string dishMemoryName = "removed participant dish") : ITask
{
    public async Task PerformAsAsync(Actor actor)
    {
        await actor.AttemptsToAsync(new AddDish(toLocation: locationName));
        actor.Remember(dishMemoryName, actor.Recall<DishResponse>());
    }
}
