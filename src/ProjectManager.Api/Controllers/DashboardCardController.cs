using ProjectManager.Api.Features;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;


namespace ProjectManager.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardCardController
{
    private readonly IMediator _mediator;

    public DashboardCardController(IMediator mediator)
        => _mediator = mediator;

    [HttpGet("{dashboardCardId}", Name = "GetDashboardCardByIdRoute")]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.NotFound)]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(GetDashboardCardByIdResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetDashboardCardByIdResponse>> GetById([FromRoute] GetDashboardCardByIdRequest request)
    {
        var response = await _mediator.Send(request);

        if (response.DashboardCard == null)
        {
            return new NotFoundObjectResult(request.DashboardCardId);
        }

        return response;
    }

    [HttpGet(Name = "GetDashboardCardsRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(GetDashboardCardsResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetDashboardCardsResponse>> Get()
        => await _mediator.Send(new GetDashboardCardsRequest());

    [HttpPost(Name = "CreateDashboardCardRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(CreateDashboardCardResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<CreateDashboardCardResponse>> Create([FromBody] CreateDashboardCardRequest request)
        => await _mediator.Send(request);

    [HttpGet("page/{pageSize}/{index}", Name = "GetDashboardCardsPageRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(GetDashboardCardsPageResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetDashboardCardsPageResponse>> Page([FromRoute] GetDashboardCardsPageRequest request)
        => await _mediator.Send(request);

    [HttpPut(Name = "UpdateDashboardCardRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(UpdateDashboardCardSettingsResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<UpdateDashboardCardSettingsResponse>> Update([FromBody] UpdateDashboardCardSettingsRequest request)
        => await _mediator.Send(request);

    [HttpDelete("{dashboardCardId}", Name = "RemoveDashboardCardRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(RemoveDashboardCardResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<RemoveDashboardCardResponse>> Remove([FromRoute] RemoveDashboardCardRequest request)
        => await _mediator.Send(request);

}
