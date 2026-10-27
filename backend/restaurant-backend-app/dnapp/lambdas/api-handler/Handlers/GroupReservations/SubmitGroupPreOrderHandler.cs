using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using APIHandler.Exceptions;
using APIHandler.Helpers;
using APIHandler.Models.GroupReservation;
using APIHandler.Services.GroupReservations;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace APIHandler.Handlers.GroupReservations;

public class SubmitGroupPreOrderHandler(IGroupReservationService groupReservationService) : IApiRequestHandler
{
    public async Task<APIGatewayProxyResponse> HandleRequest(APIGatewayProxyRequest request, ILambdaContext context)
    {
        if (!request.TryGetPathValue("groupReservationId", out string? groupReservationId))
            return ResponseBuilder.CreateErrorResponse(400, "Missing 'groupReservationId' in path parameters.", context.Logger);

        var claims = request.RequestContext?.Authorizer?.Claims;
        if (claims is null || !claims.TryGetValue("sub", out string? userId) || string.IsNullOrWhiteSpace(userId))
            return ResponseBuilder.CreateErrorResponse(401, "Unauthorized.", context.Logger);

        if (!TryDeserializeRequest(request.Body, out var submitRequest) ||
            string.IsNullOrWhiteSpace(submitRequest?.ReservationId))
        {
            return ResponseBuilder.CreateErrorResponse(400, "A valid reservationId is required.", context.Logger);
        }

        try
        {
            var result = await groupReservationService.SubmitGroupPreOrderAsync(
                userId,
                groupReservationId,
                submitRequest.ReservationId,
                context);
            return ResponseBuilder.CreateJsonResponse(200, result);
        }
        catch (GroupReservationNotFoundException ex)
        {
            return ResponseBuilder.CreateErrorResponse(404, ex.Message, context.Logger);
        }
        catch (ReservationNotFoundException ex)
        {
            return ResponseBuilder.CreateErrorResponse(404, ex.Message, context.Logger);
        }
        catch (ActionForbiddenException ex)
        {
            return ResponseBuilder.CreateErrorResponse(403, ex.Message, context.Logger);
        }
        catch (ValidationException ex)
        {
            return ResponseBuilder.CreateErrorCodeResponse(ex);
        }
        catch (Exception ex)
        {
            return ResponseBuilder.CreateErrorResponse(500, "Internal Server Error", context.Logger, ex);
        }
    }

    private static bool TryDeserializeRequest(string? body, out SubmitGroupPreOrderRequest? submitRequest)
    {
        if (string.IsNullOrWhiteSpace(body))
        {
            submitRequest = null;
            return false;
        }

        try
        {
            submitRequest = JsonSerializer.Deserialize<SubmitGroupPreOrderRequest>(body, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
            return submitRequest is not null;
        }
        catch (JsonException)
        {
            submitRequest = null;
            return false;
        }
    }
}
