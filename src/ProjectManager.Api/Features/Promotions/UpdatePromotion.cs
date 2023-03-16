using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace ProjectManager.Api.Features;

 public class UpdatePromotionValidator : AbstractValidator<UpdatePromotionRequest>
 {
     public UpdatePromotionValidator()
     {
         RuleFor(request => request.Promotion).NotNull();
         RuleFor(request => request.Promotion).SetValidator(new PromotionValidator());
     }

 }

 public class UpdatePromotionRequest : IRequest<UpdatePromotionResponse>
 {
     public PromotionDto Promotion { get; set; }
 }

 public class UpdatePromotionResponse : ResponseBase
 {
     public PromotionDto Promotion { get; set; }
 }

 public class UpdatePromotionHandler : IRequestHandler<UpdatePromotionRequest, UpdatePromotionResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public UpdatePromotionHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<UpdatePromotionResponse> Handle(UpdatePromotionRequest request, CancellationToken cancellationToken)
     {
         var promotion = await _context.Promotions.SingleAsync(x => x.PromotionId == request.Promotion.PromotionId);

         await _context.SaveChangesAsync(cancellationToken);

         return new UpdatePromotionResponse()
         {
             Promotion = promotion.ToDto()
         };
     }

 }
