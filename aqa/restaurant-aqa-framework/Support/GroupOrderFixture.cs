using Restaurant_Aqa_Framework.Api.Dtos.Auth;
using Restaurant_Aqa_Framework.Api.Dtos.Dishes;
using Restaurant_Aqa_Framework.Api.Dtos.GroupOrders;
using Restaurant_Aqa_Framework.Api.Dtos.Reservations;

namespace Restaurant_Aqa_Framework.Support;

public sealed record GroupOrderFixture(
    RegisterRequest Owner,
    string OwnerIdToken,
    ReservationResponse Reservation,
    GroupInviteResponse Invitation,
    DishResponse Dish);

public sealed record GuestSessionFixture(
    string GuestName,
    string SessionId,
    string SessionToken,
    string GroupReservationId,
    int DishQuantity,
    bool IsSubmitted,
    bool IsRemoved = false,
    IReadOnlyDictionary<string, int>? AdditionalDishes = null);
