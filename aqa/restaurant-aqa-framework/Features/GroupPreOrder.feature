@level-1
Feature: Owner reviews group pre-orders

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

  @api @negative @data-dependent
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
