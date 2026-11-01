namespace Restaurant_Aqa_Framework.Api.Dtos.GroupOrders;

public sealed record GroupStatusResponse(int CurrentParticipants, int MaxCapacity, string Status);
