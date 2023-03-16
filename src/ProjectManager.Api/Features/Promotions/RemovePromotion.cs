using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System;
using ProjectManager.Api.Models;
using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;


namespace ProjectManager.Api.Features;

 public class RemovePromotionRequest : IRequest<RemovePromotionResponse>
 {
     public Guid PromotionId { get; set; }
 }

 public class RemovePromotionResponse : ResponseBase
 {
     public PromotionDto Promotion { get; set; }
 }

 public class RemovePromotionHandler : IRequestHandler<RemovePromotionRequest, RemovePromotionResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public RemovePromotionHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<RemovePromotionResponse> Handle(RemovePromotionRequest request, CancellationToken cancellationToken)
     {
         var promotion = await _context.Promotions.SingleAsync(x => x.PromotionId == request.PromotionId);

         _context.Promotions.Remove(promotion);

         await _context.SaveChangesAsync(cancellationToken);

         return new RemovePromotionResponse()
         {
             Promotion = promotion.ToDto()
         };
     }

 }
