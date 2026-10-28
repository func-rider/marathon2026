using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using APIHandler.Exceptions;
using APIHandler.Handlers.GroupReservations;
using APIHandler.Services.GroupReservations;
using Moq;
using Xunit;

namespace APIHandler.Tests.Handlers.GroupReservations;

public class GetInviteTokenHandlerTests
{
    [Fact]
    public async Task HandleRequest_GroupReservationMissing_ReturnsNotFound()
    {
        const string reservationId = "reservation-1";
        var service = new Mock<IGroupReservationService>();
        service
            .Setup(s => s.GetGroupReservationInviteTokenAsync(reservationId))
            .ThrowsAsync(new GroupReservationNotFoundException());

        var logger = new Mock<ILambdaLogger>();
        var context = new Mock<ILambdaContext>();
        context.SetupGet(c => c.Logger).Returns(logger.Object);

        var request = new APIGatewayProxyRequest
        {
            PathParameters = new Dictionary<string, string> { ["reservationId"] = reservationId },
        };

        var response = await new GetInviteTokenHandler(service.Object).HandleRequest(request, context.Object);

        Assert.Equal(404, response.StatusCode);
    }
}
