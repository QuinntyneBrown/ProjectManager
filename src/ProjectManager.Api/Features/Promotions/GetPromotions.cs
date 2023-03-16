using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace ProjectManager.Api.Features;

 public class GetPromotionsRequest : IRequest<GetPromotionsResponse> { }

 public class GetPromotionsResponse : ResponseBase
 {
     public List<PromotionDto> Promotions { get; set; }
 }

 public class GetPromotionsHandler : IRequestHandler<GetPromotionsRequest, GetPromotionsResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public GetPromotionsHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<GetPromotionsResponse> Handle(GetPromotionsRequest request, CancellationToken cancellationToken)
     {
         return new()
         {
             Promotions = await _context.Promotions.Select(x => x.ToDto()).ToListAsync()
         };
     }

 }
