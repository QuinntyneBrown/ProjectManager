using System.Net;
using System.Threading.Tasks;
using AngularCaching.Api.Features;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AngularCaching.Api.Controllers
{
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
        [ProducesResponseType(typeof(GetToDoById.Response), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<GetToDoById.Response>> GetById([FromRoute] GetToDoById.Request request)
        {
            var response = await _mediator.Send(request);

            if (response.ToDo == null)
            {
                return new NotFoundObjectResult(request.ToDoId);
            }

            return response;
        }

        [HttpGet(Name = "GetToDosRoute")]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(GetToDos.Response), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<GetToDos.Response>> Get()
            => await _mediator.Send(new GetToDos.Request());

        [HttpPost(Name = "CreateToDoRoute")]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(CreateToDo.Response), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<CreateToDo.Response>> Create([FromBody] CreateToDo.Request request)
            => await _mediator.Send(request);

        [HttpGet("page/{pageSize}/{index}", Name = "GetToDosPageRoute")]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(GetToDosPage.Response), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<GetToDosPage.Response>> Page([FromRoute] GetToDosPage.Request request)
            => await _mediator.Send(request);

        [HttpPut(Name = "UpdateToDoRoute")]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(UpdateToDo.Response), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<UpdateToDo.Response>> Update([FromBody] UpdateToDo.Request request)
            => await _mediator.Send(request);

        [HttpDelete("{toDoId}", Name = "RemoveToDoRoute")]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(RemoveToDo.Response), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<RemoveToDo.Response>> Remove([FromRoute] RemoveToDo.Request request)
            => await _mediator.Send(request);

    }
}
