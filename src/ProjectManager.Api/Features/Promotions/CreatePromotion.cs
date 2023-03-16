using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using ProjectManager.Api.Models;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;


namespace ProjectManager.Api.Features;

 public class CreatePromotionValidator : AbstractValidator<CreatePromotionRequest>
 {
     public CreatePromotionValidator()
     {
         RuleFor(request => request.Promotion).NotNull();
         RuleFor(request => request.Promotion).SetValidator(new PromotionValidator());
     }

 }

 public class CreatePromotionRequest : IRequest<CreatePromotionResponse>
 {
     public PromotionDto Promotion { get; set; }
 }

 public class CreatePromotionResponse : ResponseBase
 {
     public PromotionDto Promotion { get; set; }
 }

 public class CreatePromotionHandler : IRequestHandler<CreatePromotionRequest, CreatePromotionResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public CreatePromotionHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<CreatePromotionResponse> Handle(CreatePromotionRequest request, CancellationToken cancellationToken)
     {
         var promotion = new Promotion(new(request.Promotion.Name));

         _context.Promotions.Add(promotion);

         await _context.SaveChangesAsync(cancellationToken);

         return new CreatePromotionResponse()
         {
             Promotion = promotion.ToDto()
         };
     }

 }
