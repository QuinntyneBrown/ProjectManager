using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectManager.Api.Features;
using System.Net;
using System.Threading.Tasks;


namespace ProjectManager.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ProjectController
{
    private readonly IMediator _mediator;

    public ProjectController(IMediator mediator)
        => _mediator = mediator;

    [HttpGet("{projectId}", Name = "GetProjectByIdRoute")]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.NotFound)]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(GetProjectByIdResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetProjectByIdResponse>> GetById([FromRoute] GetProjectByIdRequest request)
    {
        var response = await _mediator.Send(request);

        if (response.Project == null)
        {
            return new NotFoundObjectResult(request.ProjectId);
        }

        return response;
    }

    [HttpGet("name/{name}", Name = "GetProjectByNameRoute")]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.NotFound)]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(GetProjectByIdResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetProjectByNameResponse>> GetByName([FromRoute] GetProjectByNameRequest request)
    {
        var response = await _mediator.Send(request);

        if (response.Project == null)
        {
            return new NotFoundObjectResult(request.Name);
        }

        return response;
    }

    [HttpGet("user/current", Name = "GetProjectByCurrentUserRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(GetProjectByCurrentUserResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetProjectByCurrentUserResponse>> GetByCurrentUser()
        => await _mediator.Send(new GetProjectByCurrentUserRequest());


    [HttpGet(Name = "GetProjectsRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(GetProjectsResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetProjectsResponse>> Get()
        => await _mediator.Send(new GetProjectsRequest());

    [HttpPost(Name = "CreateProjectRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(CreateProjectResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<CreateProjectResponse>> Create([FromBody] CreateProjectRequest request)
        => await _mediator.Send(request);

    [HttpGet("page/{pageSize}/{index}", Name = "GetProjectsPageRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(GetProjectsPageResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetProjectsPageResponse>> Page([FromRoute] GetProjectsPageRequest request)
        => await _mediator.Send(request);

    [HttpPut(Name = "UpdateProjectRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(UpdateProjectResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<UpdateProjectResponse>> Update([FromBody] UpdateProjectRequest request)
        => await _mediator.Send(request);

    [HttpDelete("{projectId}", Name = "RemoveProjectRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(RemoveProjectResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<RemoveProjectResponse>> Remove([FromRoute] RemoveProjectRequest request)
        => await _mediator.Send(request);

}
