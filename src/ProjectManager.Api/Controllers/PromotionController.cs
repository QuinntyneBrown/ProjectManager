using MediatR;
using Microsoft.AspNetCore.Mvc;
using ProjectManager.Api.Features;
using System.Net;
using System.Threading.Tasks;


namespace ProjectManager.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PromotionController
{
    private readonly IMediator _mediator;

    public PromotionController(IMediator mediator)
        => _mediator = mediator;

    [HttpGet("{promotionId}", Name = "GetPromotionByIdRoute")]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.NotFound)]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(GetPromotionByIdResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetPromotionByIdResponse>> GetById([FromRoute] GetPromotionByIdRequest request)
    {
        var response = await _mediator.Send(request);

        if (response.Promotion == null)
        {
            return new NotFoundObjectResult(request.PromotionId);
        }

        return response;
    }

    [HttpGet("project/{projectId}", Name = "GetPromotionsByProjectRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(GetPromotionsByProjectResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetPromotionsByProjectResponse>> GetByProject([FromRoute] GetPromotionsByProjectRequest request)
        => await _mediator.Send(request);

    [HttpGet(Name = "GetPromotionsRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(GetPromotionsResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetPromotionsResponse>> Get()
        => await _mediator.Send(new GetPromotionsRequest());

    [HttpPost(Name = "CreatePromotionRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(CreatePromotionResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<CreatePromotionResponse>> Create([FromBody] CreatePromotionRequest request)
        => await _mediator.Send(request);

    [HttpGet("page/{pageSize}/{index}", Name = "GetPromotionsPageRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(GetPromotionsPageResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetPromotionsPageResponse>> Page([FromRoute] GetPromotionsPageRequest request)
        => await _mediator.Send(request);

    [HttpPut(Name = "UpdatePromotionRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(UpdatePromotionResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<UpdatePromotionResponse>> Update([FromBody] UpdatePromotionRequest request)
        => await _mediator.Send(request);

    [HttpDelete("{promotionId}", Name = "RemovePromotionRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(RemovePromotionResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<RemovePromotionResponse>> Remove([FromRoute] RemovePromotionRequest request)
        => await _mediator.Send(request);

}
