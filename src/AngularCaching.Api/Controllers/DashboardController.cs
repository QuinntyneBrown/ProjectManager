using System.Net;
using System.Threading.Tasks;
using AngularCaching.Api.Features;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AngularCaching.Api.Controllers
{
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
        [ProducesResponseType(typeof(GetDashboardById.Response), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<GetDashboardById.Response>> GetById([FromRoute]GetDashboardById.Request request)
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
        [ProducesResponseType(typeof(GetDashboards.Response), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<GetDashboards.Response>> Get()
            => await _mediator.Send(new GetDashboards.Request());
        
        [HttpPost(Name = "CreateDashboardRoute")]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(CreateDashboard.Response), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<CreateDashboard.Response>> Create([FromBody]CreateDashboard.Request request)
            => await _mediator.Send(request);
        
        [HttpGet("page/{pageSize}/{index}", Name = "GetDashboardsPageRoute")]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(GetDashboardsPage.Response), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<GetDashboardsPage.Response>> Page([FromRoute]GetDashboardsPage.Request request)
            => await _mediator.Send(request);
        
        [HttpPut(Name = "UpdateDashboardRoute")]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(UpdateDashboard.Response), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<UpdateDashboard.Response>> Update([FromBody]UpdateDashboard.Request request)
            => await _mediator.Send(request);
        
        [HttpDelete("{dashboardId}", Name = "RemoveDashboardRoute")]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(RemoveDashboard.Response), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<RemoveDashboard.Response>> Remove([FromRoute]RemoveDashboard.Request request)
            => await _mediator.Send(request);
        
    }
}
