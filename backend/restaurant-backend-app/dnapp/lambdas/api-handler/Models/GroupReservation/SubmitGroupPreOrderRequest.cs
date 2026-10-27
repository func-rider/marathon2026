using System.Text.Json.Serialization;

namespace APIHandler.Models.GroupReservation;

public sealed class SubmitGroupPreOrderRequest
{
    [JsonPropertyName("reservationId")]
    public string? ReservationId { get; set; }
}
