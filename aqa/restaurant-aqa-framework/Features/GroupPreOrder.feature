Feature: Owner reviews and submits group pre-orders

  @level-1
  Rule: The Owner can review each guest's cart in the reservation

    @ui @data-dependent
    Scenario: The Owner sees guest dishes, quantities, subtotals and cart status
      Given the owner has created a reservation for a group pre-order
      And guest "Andrii" has joined the invitation and submitted 2 of the featured dish
      And guest "Olena" has joined the invitation without choosing dishes
      When the owner opens their group pre-order
      Then the owner sees guest "Andrii" with 2 servings of the featured dish
      And guest "Andrii" is marked as "Submitted"
      And guest "Olena" is listed with an empty cart
      And guest "Olena" is marked as "Still choosing"
      And the owner sees a group total equal to the guests' subtotals

    @ui @data-dependent
    Scenario: The Owner sees an empty group
      Given the owner has created a reservation for a group pre-order
      When the owner opens their group pre-order
      Then the owner sees the empty group message and a zero total

    # Known defect: the current Owner page's Grand Total excludes carts that have not been submitted,
    # while Level 1 requires the group total to equal all participant subtotals and follow cart edits.
    @ui @data-dependent @known-defect
    Scenario: The group total follows a guest's unsubmitted cart changes
      Given the owner has created a reservation for a group pre-order
      And guest "Andrii" has joined the invitation with 2 of the featured dish
      When the owner opens their group pre-order
      Then the owner sees guest "Andrii" with 2 servings of the featured dish
      When guest "Andrii" adds one more serving of the featured dish
      And the owner refreshes the group pre-order
      Then the owner sees guest "Andrii" with 3 servings of the featured dish
      And the owner sees a group total equal to the guests' subtotals

  @level-1
  Rule: A group's participant list shows current carts and totals

    @api @data-dependent
    Scenario: The Owner receives submitted, unsubmitted and empty guest carts
      Given the owner has created a reservation for a group pre-order
      And guest "Andrii" has joined the invitation with 2 of the featured dish
      And guest "Olena" has joined the invitation without choosing dishes
      When "the owner" requests the group participant list
      Then the response includes exactly the joined guests
      And the guest "Andrii" cart remains unsubmitted with 2 servings in the response
      And the guest "Olena" remains in the response with an empty unsubmitted cart
      And the group total equals the sum of the participant subtotals

    @api @data-dependent
    Scenario: The group total changes when a guest changes their cart
      Given the owner has created a reservation for a group pre-order
      And guest "Andrii" has joined the invitation with 2 of the featured dish
      When "the owner" requests the group participant list
      Then the group total equals the sum of the participant subtotals
      When guest "Andrii" adds one more serving of the featured dish
      And the owner refreshes the participant list
      Then the group total reflects guest "Andrii"'s updated cart

    @api @data-dependent
    Scenario: A group with no guests returns an empty list and a zero total
      Given the owner has created a reservation for a group pre-order
      When "the owner" requests the group participant list
      Then the response includes no guests and a zero total

  @level-1 @api @negative @data-dependent
  Rule: Only the reservation Owner can view the group's participant list

    Background:
      Given the owner has created a reservation for a group pre-order
      And guest "Andrii" has joined the invitation with 1 of the featured dish

    Scenario Outline: A non-owner cannot view a group's participant list
      When "<viewer>" requests the group participant list
      Then the participant list is denied to this viewer

      Examples: Other identities
        | viewer                       |
        | another customer             |
        | a guest                      |
        | a waiter                     |
        | an unauthenticated visitor   |

    Scenario: The Owner is told when a group does not exist
      When the owner requests a group that does not exist
      Then the group is reported as not found

@level-2
Rule: Only submitted guest carts are sent as one consolidated restaurant order

    @ui @data-dependent
    Scenario: The Owner sees that the pre-order was sent to the restaurant
      Given the owner has created a reservation for a group pre-order
      And the owner has created an initial pre-order for the group
      And guest "Andrii" has joined the invitation and submitted 2 of the featured dish
      When the owner opens their group pre-order
      And the owner confirms the group pre-order
      Then the owner sees that the group pre-order was submitted

    @api @data-dependent
    Scenario: The waiter receives the confirmed order with submitted quantities merged
      Given the owner has created a reservation for a group pre-order
      And the owner has created an initial pre-order for the group
      And guest "Andrii" has joined the invitation and submitted 2 of the featured dish
      And guest "Olena" has joined the invitation and submitted 1 of the featured dish
      And guest "Taras" has joined the invitation with 4 of the featured dish
      When "the owner" submits the group pre-order
      Then the submitted dishes contain the featured dish with quantity 3
      When the waiter requests the confirmed order
      Then the waiter sees the featured dish with quantity 3 and status "SubmittedByCustomer"
      And the group reservation status is "Submitted"

    @ui @data-dependent
    Scenario: The waiter sees the Owner's confirmed group order in the reservation pre-order page
      Given the waiter has created a reservation for the Owner's group pre-order
      And the owner has created an initial pre-order for the group
      And guest "Andrii" has joined the invitation and submitted 2 of the featured dish
      And guest "Olena" has joined the invitation and submitted 1 of the featured dish
      And guest "Taras" has joined the invitation with 4 of the featured dish
      And the owner has submitted the group's consolidated pre-order
      When the waiter opens the reservation's confirmed pre-order
      Then the waiter sees only the featured dish with quantity 3 in the order

@level-2
Rule: The Owner is told why a group pre-order cannot be confirmed

    @api @negative @data-dependent
    Scenario: The Owner cannot submit a group with no submitted carts
      Given the owner has created a reservation for a group pre-order
      And guest "Andrii" has joined the invitation with 2 of the featured dish
      When "the owner" submits the group pre-order
      Then the group pre-order is rejected with "There are no submitted sessions for this group reservation."

    @api @negative @data-dependent
    Scenario: The Owner is told when the group does not exist during confirmation
      Given the owner has created a reservation for a group pre-order
      When "the owner" submits a group that does not exist
      Then the group pre-order is rejected with "Group reservation was not found"

    @api @negative @data-dependent
    Scenario: The Owner is told when the reservation has no order
      Given the owner has created a reservation for a group pre-order
      And guest "Andrii" has joined the invitation and submitted 2 of the featured dish
      When "the owner" submits the group pre-order
      Then the group pre-order is rejected with "Order not found."

    @api @negative @data-dependent
    Scenario: The Owner cannot confirm a group twice
      Given the owner has created a reservation for a group pre-order
      And the owner has created an initial pre-order for the group
      And guest "Andrii" has joined the invitation and submitted 2 of the featured dish
      When "the owner" submits the group pre-order
      Then the group pre-order is submitted successfully
      When "the owner" submits the group pre-order
      Then the group pre-order is rejected with "Group reservation was submitted."

    @api @negative @data-dependent
    Scenario: Another customer cannot confirm the group's pre-order
      Given the owner has created a reservation for a group pre-order
      And guest "Andrii" has joined the invitation and submitted 2 of the featured dish
      When "another customer" submits the group pre-order
      Then the group pre-order is rejected with "Only the reservation owner can submit this group pre-order."

@level-3
Rule: The Owner can remove only participants from their own group

    @ui @data-dependent
    Scenario: Removing one submitted participant updates the remaining list and total
      Given the owner has created a reservation for a group pre-order
      And guest "Andrii" has joined the invitation and submitted 2 of the featured dish
      And guest "Olena" has joined the invitation and submitted 3 of the featured dish
      And guest "Taras" has joined the invitation and submitted 1 of the featured dish
      When the owner opens their group pre-order
      And the owner removes guest "Olena" from the group
      Then guest "Olena" is no longer listed in the group pre-order
      And the owner sees guest "Andrii" with 2 servings of the featured dish
      And the owner sees guest "Taras" with 1 servings of the featured dish
      And the owner sees a group total equal to the guests' subtotals

    @api @data-dependent
    Scenario: Removing the last guest leaves an empty list and zero total
      Given the owner has created a reservation for a group pre-order
      And guest "LastGuest" has joined the invitation and submitted 2 of the featured dish
      When the owner removes guest "LastGuest" from the group
      Then the response includes no guests and a zero total

    @api @negative @data-dependent
    Scenario: The Owner cannot remove a participant from another group
      Given the owner has created a reservation for a group pre-order
      And another owner has created a separate group pre-order
      And guest "ForeignGuest" has joined the separate group with 1 of its featured dish
      When the owner attempts to remove the second group's guest from their group
      Then deleting a participant from another group is rejected

    @api @negative @data-dependent
    Scenario: The Owner is told when the guest session does not exist
      Given the owner has created a reservation for a group pre-order
      When the owner tries to remove a participant that does not exist
      Then deletion reports the guest session was not found

    @api @negative @data-dependent
    Scenario: Another customer cannot remove a group participant
      Given the owner has created a reservation for a group pre-order
      And guest "Andrii" has joined the invitation with 1 of the featured dish
      When another customer tries to remove guest "Andrii"
      Then deletion is denied because the requester is not the Owner

    @ui @data-dependent
    Scenario: The waiter receives the submitted order without the removed guest's distinct dish
      Given the waiter has created a reservation for the Owner's group pre-order
      And the owner has created an initial pre-order for the group
      And a separate dish has been added for the removed guest
      And guest "Andrii" has joined the invitation and submitted 2 of the featured dish
      And guest "Olena" has joined the invitation and submitted 1 of the separate dish
      When the owner opens their group pre-order
      Then the owner sees guest "Olena" with 1 serving of the separate dish
      When the owner removes guest "Olena" from the group
      And the owner confirms the group pre-order
      And the waiter opens the reservation's confirmed pre-order
      Then the waiter sees only the featured dish with quantity 2 in the order
      And the waiter's order does not contain the removed guest's dish
