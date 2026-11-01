using Restaurant_Aqa_Framework.Ui;

namespace Restaurant_Aqa_Framework.Screenplay.Questions;

/// <summary>The currently displayed Owner group pre-order page, for observable assertions in Then steps.</summary>
public sealed class TheGroupOrderScreen : IQuestion<GroupOrderPage>
{
    public Task<GroupOrderPage> AnsweredByAsync(Actor actor) =>
        Task.FromResult(new GroupOrderPage(actor.LookingAtThePage()));
}
