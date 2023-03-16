using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace ProjectManager.Api.Features;

 public class GetPromotionByIdRequest : IRequest<GetPromotionByIdResponse>
 {
     public Guid PromotionId { get; set; }
 }

 public class GetPromotionByIdResponse : ResponseBase
 {
     public PromotionDto Promotion { get; set; }
 }

 public class GetPromotionByIdHandler : IRequestHandler<GetPromotionByIdRequest, GetPromotionByIdResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public GetPromotionByIdHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<GetPromotionByIdResponse> Handle(GetPromotionByIdRequest request, CancellationToken cancellationToken)
     {
         return new()
         {
             Promotion = (await _context.Promotions.SingleOrDefaultAsync(x => x.PromotionId == request.PromotionId)).ToDto()
         };
     }

 }
