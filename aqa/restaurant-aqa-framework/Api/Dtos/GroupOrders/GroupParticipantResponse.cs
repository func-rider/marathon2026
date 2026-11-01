namespace Restaurant_Aqa_Framework.Api.Dtos.GroupOrders;

public sealed record GroupParticipantResponse(
    string Id,
    string Type,
    string Name,
    IReadOnlyList<GroupParticipantItemResponse> Items,
    decimal Total,
    bool IsSubmitted);
