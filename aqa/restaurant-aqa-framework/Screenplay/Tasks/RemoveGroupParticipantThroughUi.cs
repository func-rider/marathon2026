using Restaurant_Aqa_Framework.Api.Seeding;
using Restaurant_Aqa_Framework.Support;
using Restaurant_Aqa_Framework.Ui;

namespace Restaurant_Aqa_Framework.Screenplay.Tasks;

/// <summary>Confirms the Owner's removal in the UI, then prevents cleanup from repeating the successful DELETE.</summary>
public sealed class RemoveGroupParticipantThroughUi(string guestName) : ITask
{
    public async Task PerformAsAsync(Actor actor)
    {
        var guest = actor.Recall<GuestSessionFixture>(guestName);
        var page = new GroupOrderPage(actor.LookingAtThePage());
        await page.RemoveGuestAsync(guest.GuestName);

        actor.Recall<CleanupRegistration>($"guest cleanup:{guestName}").Disarm();
        actor.Remember(guestName, guest with { IsRemoved = true });
        await page.RemovalSuccessMessage(guest.GuestName).WaitForAsync();
    }
}
