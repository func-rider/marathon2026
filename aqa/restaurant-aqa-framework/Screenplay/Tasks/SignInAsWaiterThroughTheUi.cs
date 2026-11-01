using Restaurant_Aqa_Framework.Configuration;

namespace Restaurant_Aqa_Framework.Screenplay.Tasks;

/// <summary>Signs in using the configured Waiter account through the application's login page.</summary>
public sealed class SignInAsWaiterThroughTheUi : ITask
{
    public async Task PerformAsAsync(Actor actor)
    {
        var (username, password) = Settings.Current.RequireWaiter();
        await actor.AttemptsToAsync(new SignInThroughTheLoginForm(username, password));
    }
}
