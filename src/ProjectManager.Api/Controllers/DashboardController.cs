using System.Net;
using System.Threading.Tasks;
using ProjectManager.Api.Features;
using MediatR;
using Microsoft.AspNetCore.Mvc;


namespace ProjectManager.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController
{
    private readonly IMediator _mediator;

    public DashboardController(IMediator mediator)
        => _mediator = mediator;

    [HttpGet("{dashboardId}", Name = "GetDashboardByIdRoute")]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.NotFound)]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(GetDashboardByIdResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetDashboardByIdResponse>> GetById([FromRoute] GetDashboardByIdRequest request)
    {
        var response = await _mediator.Send(request);

        if (response.Dashboard == null)
        {
            return new NotFoundObjectResult(request.DashboardId);
        }

        return response;
    }

    [HttpGet(Name = "GetDashboardsRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(GetDashboardsResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetDashboardsResponse>> Get()
        => await _mediator.Send(new GetDashboardsRequest());

    [HttpPost(Name = "CreateDashboardRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(CreateDashboardResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<CreateDashboardResponse>> Create([FromBody] CreateDashboardRequest request)
        => await _mediator.Send(request);

    [HttpGet("page/{pageSize}/{index}", Name = "GetDashboardsPageRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(GetDashboardsPageResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetDashboardsPageResponse>> Page([FromRoute] GetDashboardsPageRequest request)
        => await _mediator.Send(request);

    [HttpPut(Name = "UpdateDashboardRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(UpdateDashboardResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<UpdateDashboardResponse>> Update([FromBody] UpdateDashboardRequest request)
        => await _mediator.Send(request);

    [HttpDelete("{dashboardId}", Name = "RemoveDashboardRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(RemoveDashboardResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<RemoveDashboardResponse>> Remove([FromRoute] RemoveDashboardRequest request)
        => await _mediator.Send(request);

}
