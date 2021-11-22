using AngularCaching.Api.Features;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;

namespace AngularCaching.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StoredEventController
    {
        private readonly IMediator _mediator;

        public StoredEventController(IMediator mediator)
            => _mediator = mediator;

        [AllowAnonymous]
        [HttpGet(Name = "GetStoredEventsRoute")]
        [HttpGet("{since}", Name = "GetStoredEventsSinceRoute")]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(GetStoredEvents.Response), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<GetStoredEvents.Response>> Get([FromRoute] GetStoredEvents.Request request)
            => await _mediator.Send(request);

    }
}
