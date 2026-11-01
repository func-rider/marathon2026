using Restaurant_Aqa_Framework.Api.Dtos.Dishes;

namespace Restaurant_Aqa_Framework.Api.Dtos.GroupOrders;

public sealed record GroupParticipantItemResponse(DishResponse Dish, int Quantity);
