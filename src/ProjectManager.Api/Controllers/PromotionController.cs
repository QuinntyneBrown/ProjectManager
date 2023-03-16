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
    [ProducesResponseType(typeof(GetPromotionById.Response), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetPromotionById.Response>> GetById([FromRoute] GetPromotionById.Request request)
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
    [ProducesResponseType(typeof(GetPromotionsByProject.Response), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetPromotionsByProject.Response>> GetByProject([FromRoute] GetPromotionsByProject.Request request)
        => await _mediator.Send(request);

    [HttpGet(Name = "GetPromotionsRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(GetPromotions.Response), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetPromotions.Response>> Get()
        => await _mediator.Send(new GetPromotions.Request());

    [HttpPost(Name = "CreatePromotionRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(CreatePromotion.Response), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<CreatePromotion.Response>> Create([FromBody] CreatePromotion.Request request)
        => await _mediator.Send(request);

    [HttpGet("page/{pageSize}/{index}", Name = "GetPromotionsPageRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(GetPromotionsPage.Response), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetPromotionsPage.Response>> Page([FromRoute] GetPromotionsPage.Request request)
        => await _mediator.Send(request);

    [HttpPut(Name = "UpdatePromotionRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(UpdatePromotion.Response), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<UpdatePromotion.Response>> Update([FromBody] UpdatePromotion.Request request)
        => await _mediator.Send(request);

    [HttpDelete("{promotionId}", Name = "RemovePromotionRoute")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(RemovePromotion.Response), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<RemovePromotion.Response>> Remove([FromRoute] RemovePromotion.Request request)
        => await _mediator.Send(request);

}
