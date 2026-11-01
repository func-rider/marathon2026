using System.Globalization;
using Restaurant_Aqa_Framework.Api.Dtos.GroupOrders;
using Restaurant_Aqa_Framework.Api.Dtos.Orders;
using Restaurant_Aqa_Framework.Screenplay;
using Restaurant_Aqa_Framework.Screenplay.Questions;
using Restaurant_Aqa_Framework.Screenplay.Tasks;
using Restaurant_Aqa_Framework.Support;
using Restaurant_Aqa_Framework.Ui;

namespace Restaurant_Aqa_Framework.StepDefinitions;

[Binding]
public sealed class GroupPreOrderStepDefinitions(Actor actor) : StepDefinitionBase(actor)
{
    [Given("the owner has created a reservation for a group pre-order")]
    public Task GivenOwnerHasCreatedGroupReservation() => Actor.AttemptsToAsync(new SetUpGroupPreOrder());

    [Given("the waiter has created a reservation for the Owner's group pre-order")]
    public Task GivenWaiterHasCreatedOwnersGroupReservation() => Actor.AttemptsToAsync(new SetUpGroupPreOrder(createReservationAsWaiter: true));

    [Given("the owner has created an initial pre-order for the group")]
    public Task GivenOwnerHasCreatedInitialGroupPreOrder() => Actor.AttemptsToAsync(new CreateInitialGroupPreOrder());

    [Given("the owner has submitted the group's consolidated pre-order")]
    public Task GivenOwnerHasSubmittedGroupPreOrder() => Actor.AttemptsToAsync(new SubmitGroupPreOrder("the owner"));

    [Given("guest {string} has joined the invitation with {int} of the featured dish")]
    public Task GivenGuestHasJoinedWithDish(string guestName, int quantity) =>
        Actor.AttemptsToAsync(new InviteGuestToGroupPreOrder(guestName, quantity));

    [Given("guest {string} has joined the invitation and submitted {int} of the featured dish")]
    public Task GivenGuestHasJoinedAndSubmitted(string guestName, int quantity) =>
        Actor.AttemptsToAsync(new InviteGuestToGroupPreOrder(guestName, quantity, submitCart: true));

    [Given("guest {string} has joined the invitation without choosing dishes")]
    public Task GivenGuestHasJoinedWithoutDishes(string guestName) =>
        Actor.AttemptsToAsync(new InviteGuestToGroupPreOrder(guestName));

    [When("the owner opens their group pre-order")]
    [Scope(Tag = "ui")]
    public Task WhenOwnerOpensGroupPreOrder() => Actor.AttemptsToAsync(new OpenGroupPreOrderForOwner());

    [When("the owner confirms the group pre-order")]
    [Scope(Tag = "ui")]
    public Task WhenOwnerConfirmsGroupPreOrder() => Actor.AttemptsToAsync(new SubmitGroupPreOrderThroughUi());

    [When("{string} requests the group participant list")]
    [Scope(Tag = "api")]
    public Task WhenViewerRequestsGroupParticipants(string viewer) =>
        Actor.AttemptsToAsync(new RequestGroupParticipants(viewer));

    [When("the owner requests a group that does not exist")]
    [Scope(Tag = "api")]
    public Task WhenOwnerRequestsMissingGroup() =>
        Actor.AttemptsToAsync(new RequestGroupParticipants("the owner", groupExists: false));

    [When("{string} submits the group pre-order")]
    [Scope(Tag = "api")]
    public Task WhenViewerSubmitsGroupPreOrder(string viewer) =>
        Actor.AttemptsToAsync(new SubmitGroupPreOrder(viewer));

    [When("{string} submits a group that does not exist")]
    [Scope(Tag = "api")]
    public Task WhenViewerSubmitsMissingGroup(string viewer) =>
        Actor.AttemptsToAsync(new SubmitGroupPreOrder(viewer, groupExists: false));

    [When("the waiter requests the confirmed order")]
    [Scope(Tag = "api")]
    public Task WhenWaiterRequestsConfirmedOrder() => Actor.AttemptsToAsync(new RequestConfirmedGroupOrder());

    [When("the waiter opens the reservation's confirmed pre-order")]
    [Scope(Tag = "ui")]
    public Task WhenWaiterOpensConfirmedOrder() => Actor.AttemptsToAsync(new OpenConfirmedOrderAsWaiter());

    [When("guest {string} adds one more serving of the featured dish")]
    public Task WhenGuestAddsOneMoreServing(string guestName) =>
        Actor.AttemptsToAsync(new ChangeGuestPreOrderCart(guestName));

    [When("the owner refreshes the group pre-order")]
    [Scope(Tag = "ui")]
    public async Task WhenOwnerRefreshesGroupPreOrder() =>
        await (await Actor.AsksForAsync(new TheGroupOrderScreen())).RefreshAsync();

    [When("the owner refreshes the participant list")]
    [Scope(Tag = "api")]
    public Task WhenOwnerRefreshesParticipantList() =>
        Actor.AttemptsToAsync(new RequestGroupParticipants("the owner"));

    [Then("the owner sees guest {string} with {int} servings of the featured dish")]
    [Scope(Tag = "ui")]
    public async Task ThenOwnerSeesGuestCart(string guestName, int quantity)
    {
        var fixture = Recall<GroupOrderFixture>();
        var guest = Recall<GuestSessionFixture>(guestName);
        var page = await Actor.AsksForAsync(new TheGroupOrderScreen());
        var card = page.ParticipantCard(guest.GuestName);
        var text = await page.VisibleTextAsync();
        await Assert.That(await card.IsVisibleAsync()).IsTrue().Because(text);
        await Assert.That(await GroupOrderPage.Dish(card, fixture.Dish.Name).IsVisibleAsync()).IsTrue().Because(await card.InnerTextAsync());
        await Assert.That(await GroupOrderPage.Quantity(card, quantity).IsVisibleAsync()).IsTrue().Because(await card.InnerTextAsync());
        await Assert.That(await GroupOrderPage.Subtotal(card).InnerTextAsync())
            .Contains(Money(fixture.Dish.Price * quantity)).Because(await card.InnerTextAsync());
    }

    [Then("guest {string} is marked as {string}")]
    [Scope(Tag = "ui")]
    public async Task ThenGuestHasStatus(string guestName, string status)
    {
        var page = await Actor.AsksForAsync(new TheGroupOrderScreen());
        var guest = Recall<GuestSessionFixture>(guestName);
        var card = page.ParticipantCard(guest.GuestName);
        await Assert.That(await GroupOrderPage.CartStatus(card).InnerTextAsync()).IsEqualTo(status).Because(await card.InnerTextAsync());
    }

    [Then("guest {string} is listed with an empty cart")]
    [Scope(Tag = "ui")]
    public async Task ThenGuestHasEmptyCart(string guestName)
    {
        var page = await Actor.AsksForAsync(new TheGroupOrderScreen());
        var guest = Recall<GuestSessionFixture>(guestName);
        var card = page.ParticipantCard(guest.GuestName);
        await Assert.That(await card.IsVisibleAsync()).IsTrue().Because(await page.VisibleTextAsync());
        await Assert.That(await GroupOrderPage.NoDishes(card).IsVisibleAsync()).IsTrue().Because(await card.InnerTextAsync());
        await Assert.That(await GroupOrderPage.Subtotal(card).InnerTextAsync()).Contains(Money(0m)).Because(await card.InnerTextAsync());
    }

    [Then("the response includes exactly the joined guests")]
    [Scope(Tag = "api")]
    public async Task ThenResponseIncludesExactlyJoinedGuests()
    {
        var response = Actor.TheLastResponse().Json<GroupSessionsResponse>();
        var expectedIds = CurrentGuests().Select(guest => guest.SessionId).Order().ToArray();
        var actualIds = response.Participants.Select(participant => participant.Id).Order().ToArray();
        await Assert.That(actualIds.SequenceEqual(expectedIds)).IsTrue()
            .Because($"expected guests [{string.Join(", ", expectedIds)}], got [{string.Join(", ", actualIds)}]; response body was: {Actor.TheLastResponse().Body}");
    }

    [Then("the response includes no guests and a zero total")]
    [Scope(Tag = "api")]
    public async Task ThenResponseIncludesNoGuestsAndZeroTotal()
    {
        var response = Actor.TheLastResponse().Json<GroupSessionsResponse>();
        await Assert.That(response.Participants).IsEmpty().Because($"response body was: {Actor.TheLastResponse().Body}");
        await Assert.That(response.Total).IsEqualTo(0m).Because($"response body was: {Actor.TheLastResponse().Body}");
    }

    [Then("the owner sees a group total equal to the guests' subtotals")]
    [Scope(Tag = "ui")]
    public async Task ThenUiGroupTotalEqualsAllGuestSubtotals()
    {
        var page = await Actor.AsksForAsync(new TheGroupOrderScreen());
        var expected = CurrentGuests()
            .Sum(guest => Recall<GroupOrderFixture>().Dish.Price * guest.DishQuantity);
        await Assert.That(await page.GrandTotal.InnerTextAsync()).Contains(Money(expected)).Because(await page.VisibleTextAsync());
    }

    [Then("the owner sees the empty group message and a zero total")]
    [Scope(Tag = "ui")]
    public async Task ThenOwnerSeesEmptyGroup()
    {
        var page = await Actor.AsksForAsync(new TheGroupOrderScreen());
        await Assert.That(await page.EmptyGroupMessage.IsVisibleAsync()).IsTrue().Because(await page.VisibleTextAsync());
        await Assert.That(await page.GrandTotal.InnerTextAsync()).Contains(Money(0m)).Because(await page.VisibleTextAsync());
    }

    [Then("the owner sees that the group pre-order was submitted")]
    [Scope(Tag = "ui")]
    public async Task ThenOwnerSeesSubmittedGroupPreOrder()
    {
        var page = await Actor.AsksForAsync(new TheGroupOrderScreen());
        await page.SubmittedMessage.WaitForAsync();
        await Assert.That(await page.SubmittedMessage.IsVisibleAsync()).IsTrue().Because(await page.VisibleTextAsync());
    }

    [Then("the submitted dishes contain the featured dish with quantity {int}")]
    [Scope(Tag = "api")]
    public async Task ThenSubmittedDishesContainFeaturedDish(int quantity)
    {
        var fixture = Recall<GroupOrderFixture>();
        var submitted = Actor.Recall<List<SubmittedDishResponse>>("submitted group dishes");
        await Assert.That(submitted.Count).IsEqualTo(1).Because($"submitted dishes: {Actor.TheLastResponse().Body}");
        await Assert.That(submitted[0].DishId).IsEqualTo(fixture.Dish.Id).Because($"submitted dishes: {Actor.TheLastResponse().Body}");
        await Assert.That(submitted[0].Quantity).IsEqualTo(quantity).Because($"submitted dishes: {Actor.TheLastResponse().Body}");
    }

    [Then("the waiter sees the featured dish with quantity {int} and status {string}")]
    [Scope(Tag = "api")]
    public async Task ThenWaiterSeesConfirmedOrder(int quantity, string status)
    {
        var fixture = Recall<GroupOrderFixture>();
        var order = Actor.Recall<GetOrderResponse>();
        await Assert.That(order.OrderItems.Count).IsEqualTo(1).Because($"order was {System.Text.Json.JsonSerializer.Serialize(order)}");
        await Assert.That(order.OrderItems[0].Dish.Id).IsEqualTo(fixture.Dish.Id).Because($"order was {System.Text.Json.JsonSerializer.Serialize(order)}");
        await Assert.That(order.OrderItems[0].Quantity).IsEqualTo(quantity).Because($"order was {System.Text.Json.JsonSerializer.Serialize(order)}");
        await Assert.That(order.Status.ToString()).IsEqualTo(status).Because($"order was {System.Text.Json.JsonSerializer.Serialize(order)}");
    }

    [Then("the waiter sees only the featured dish with quantity {int} in the order")]
    [Scope(Tag = "ui")]
    public async Task ThenWaiterSeesOnlyFeaturedDishInUi(int quantity)
    {
        var fixture = Recall<GroupOrderFixture>();
        var page = new WaiterPreOrderPage(Actor.LookingAtThePage());
        var item = page.DishItem(fixture.Dish.Name);
        await page.WaitForDishAsync(fixture.Dish.Name);
        await Assert.That(await page.OrderItems.CountAsync()).IsEqualTo(1).Because(await page.VisibleTextAsync());
        await Assert.That(await item.IsVisibleAsync()).IsTrue().Because(await page.VisibleTextAsync());
        await Assert.That(await WaiterPreOrderPage.Quantity(item).InnerTextAsync())
            .IsEqualTo($"Quantity: {quantity}").Because(await page.VisibleTextAsync());
    }

    [Then("the group reservation status is {string}")]
    [Scope(Tag = "api")]
    public async Task ThenGroupReservationHasStatus(string status)
    {
        var group = Actor.Recall<GroupStatusResponse>();
        await Assert.That(group.Status).IsEqualTo(status).Because($"group status was {group.Status}");
    }

    [Then("the group pre-order is submitted successfully")]
    [Scope(Tag = "api")]
    public async Task ThenGroupPreOrderIsSubmittedSuccessfully()
    {
        var outcome = await Actor.AsksForAsync(new TheOutcome());
        await Assert.That(outcome.Succeeded).IsTrue().Because($"response body was: {outcome.Body}");
    }

    [Then("the group pre-order is rejected with {string}")]
    [Scope(Tag = "api")]
    public async Task ThenGroupPreOrderIsRejectedWith(string expectedMessage)
    {
        var outcome = await Actor.AsksForAsync(new TheOutcome());
        await Assert.That(outcome.Succeeded).IsFalse().Because($"the request unexpectedly succeeded: {outcome.Body}");
        await Assert.That(outcome.ErrorMessage).IsEqualTo(expectedMessage).Because($"response body was: {outcome.Body}");
    }

    [Then("the guest {string} cart remains unsubmitted with {int} servings in the response")]
    [Scope(Tag = "api")]
    public async Task ThenUnsubmittedGuestCartIsReturned(string guestName, int quantity)
    {
        var fixture = Recall<GroupOrderFixture>();
        var guest = Recall<GuestSessionFixture>(guestName);
        var response = Actor.TheLastResponse().Json<GroupSessionsResponse>();
        var participant = response.Participants.SingleOrDefault(item => item.Id == guest.SessionId);

        await Assert.That(participant is not null).IsTrue().Because($"response body was: {Actor.TheLastResponse().Body}");
        await Assert.That(participant!.IsSubmitted).IsFalse().Because($"response body was: {Actor.TheLastResponse().Body}");
        await Assert.That(participant.Items.Count).IsEqualTo(1).Because($"response body was: {Actor.TheLastResponse().Body}");
        await Assert.That(participant.Items[0].Dish.Id).IsEqualTo(fixture.Dish.Id).Because($"response body was: {Actor.TheLastResponse().Body}");
        await Assert.That(participant.Items[0].Quantity).IsEqualTo(quantity).Because($"response body was: {Actor.TheLastResponse().Body}");
        await Assert.That(participant.Total).IsEqualTo(fixture.Dish.Price * quantity).Because($"response body was: {Actor.TheLastResponse().Body}");
    }

    [Then("the guest {string} remains in the response with an empty unsubmitted cart")]
    [Scope(Tag = "api")]
    public async Task ThenEmptyGuestCartIsReturned(string guestName)
    {
        var guest = Recall<GuestSessionFixture>(guestName);
        var response = Actor.TheLastResponse().Json<GroupSessionsResponse>();
        var participant = response.Participants.SingleOrDefault(item => item.Id == guest.SessionId);

        await Assert.That(participant is not null).IsTrue().Because($"response body was: {Actor.TheLastResponse().Body}");
        await Assert.That(participant!.IsSubmitted).IsFalse().Because($"response body was: {Actor.TheLastResponse().Body}");
        await Assert.That(participant.Items).IsEmpty().Because($"response body was: {Actor.TheLastResponse().Body}");
        await Assert.That(participant.Total).IsEqualTo(0m).Because($"response body was: {Actor.TheLastResponse().Body}");
    }

    [Then("the group total equals the sum of the participant subtotals")]
    [Scope(Tag = "api")]
    public async Task ThenGroupTotalMatchesParticipantTotals()
    {
        var response = Actor.TheLastResponse().Json<GroupSessionsResponse>();
        var participantTotal = response.Participants.Sum(participant => participant.Total);
        await Assert.That(response.Total).IsEqualTo(participantTotal)
            .Because($"participants summed to {participantTotal}; response body was: {Actor.TheLastResponse().Body}");
        Actor.Remember("initial group snapshot", response);
    }

    [Then("the group total reflects guest {string}'s updated cart")]
    [Scope(Tag = "api")]
    public async Task ThenGroupTotalReflectsGuestCartUpdate(string guestName)
    {
        var fixture = Recall<GroupOrderFixture>();
        var guest = Recall<GuestSessionFixture>(guestName);
        var previous = Actor.Recall<GroupSessionsResponse>("initial group snapshot");
        var response = Actor.TheLastResponse().Json<GroupSessionsResponse>();
        var participant = response.Participants.Single(item => item.Id == guest.SessionId);
        var expected = fixture.Dish.Price * guest.DishQuantity;

        await Assert.That(participant.Items.Single().Quantity).IsEqualTo(guest.DishQuantity)
            .Because($"response body was: {Actor.TheLastResponse().Body}");
        await Assert.That(participant.Total).IsEqualTo(expected)
            .Because($"response body was: {Actor.TheLastResponse().Body}");
        await Assert.That(response.Total).IsEqualTo(previous.Total + fixture.Dish.Price)
            .Because($"previous total was {previous.Total}; response body was: {Actor.TheLastResponse().Body}");
    }

    [Then("the participant list is denied to this viewer")]
    [Scope(Tag = "api")]
    public async Task ThenParticipantListIsDenied()
    {
        var outcome = await Actor.AsksForAsync(new TheOutcome());
        await Assert.That(outcome.Succeeded).IsFalse().Because($"the request unexpectedly succeeded: {outcome.Body}");
        await Assert.That(outcome.Status is 401 or 403).IsTrue().Because($"response body was: {outcome.Body}");
    }

    [Then("the group is reported as not found")]
    [Scope(Tag = "api")]
    public async Task ThenGroupIsNotFound()
    {
        var outcome = await Actor.AsksForAsync(new TheOutcome());
        await Assert.That(outcome.Status).IsEqualTo(404).Because($"response body was: {outcome.Body}");
        await Assert.That(outcome.ErrorMessage).Contains("not found").Because($"response body was: {outcome.Body}");
    }

    private static string Money(decimal amount) =>
        $"${amount.ToString("0.00", CultureInfo.InvariantCulture)}";

    private IEnumerable<GuestSessionFixture> CurrentGuests() =>
        Actor.RecallAll<GuestSessionFixture>().GroupBy(guest => guest.SessionId).Select(group => group.Last());
}
