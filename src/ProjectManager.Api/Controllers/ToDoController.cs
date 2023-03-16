using ProjectManager.Api.Features;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;


namespace ProjectManager.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ToDoController
{
    private readonly IMediator _mediator;

    public ToDoController(IMediator mediator)
        => _mediator = mediator;

    [HttpGet("{toDoId}", Name = "GetToDoByIdRoute")]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.NotFound)]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(GetToDoByIdResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetToDoByIdResponse>> GetById([FromRoute] GetToDoByIdRequest request)
    {
        var response = await _mediator.Send(request);

        if (response.ToDo == null)
        {
            return new NotFoundObjectResult(request.ToDoId);
        }

        return response;
    }

    [HttpGet("project/{name}", Name = "GetToDosByProjectNameRoute")]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.NotFound)]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(GetToDosByProjectNameResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetToDosByProjectNameResponse>> GetByProjectName([FromRoute] GetToDosByProjectNameRequest request)
        => await _mediator.Send(request);

    [HttpGet(Name = "GetToDosRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(GetToDosResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetToDosResponse>> Get()
        => await _mediator.Send(new GetToDosRequest());

    [HttpPost(Name = "CreateToDoRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(CreateToDoResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<CreateToDoResponse>> Create([FromBody] CreateToDoRequest request)
        => await _mediator.Send(request);

    [HttpGet("page/{pageSize}/{index}", Name = "GetToDosPageRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(GetToDosPageResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetToDosPageResponse>> Page([FromRoute] GetToDosPageRequest request)
        => await _mediator.Send(request);

    [HttpPut(Name = "UpdateToDoRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(UpdateToDoResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<UpdateToDoResponse>> Update([FromBody] UpdateToDoRequest request)
        => await _mediator.Send(request);

    [HttpDelete("{toDoId}", Name = "RemoveToDoRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(RemoveToDoResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<RemoveToDoResponse>> Remove([FromRoute] RemoveToDoRequest request)
        => await _mediator.Send(request);

}
