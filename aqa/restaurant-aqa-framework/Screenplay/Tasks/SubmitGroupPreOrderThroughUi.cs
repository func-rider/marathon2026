using Restaurant_Aqa_Framework.Screenplay.Questions;

namespace Restaurant_Aqa_Framework.Screenplay.Tasks;

/// <summary>Confirms the group pre-order from the Owner's open group pre-order page.</summary>
public sealed class SubmitGroupPreOrderThroughUi : ITask
{
    public async Task PerformAsAsync(Actor actor)
    {
        var page = await actor.AsksForAsync(new TheGroupOrderScreen());
        await page.SubmitPreOrderAsync();
    }
}
