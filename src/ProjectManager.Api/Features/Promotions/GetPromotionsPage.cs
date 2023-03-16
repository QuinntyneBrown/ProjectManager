using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using ProjectManager.Api.Extensions;
using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using ProjectManager.Api.Extensions;
using Microsoft.EntityFrameworkCore;


namespace ProjectManager.Api.Features;

 public class GetPromotionsPageRequest : IRequest<GetPromotionsPageResponse>
 {
     public int PageSize { get; set; }
     public int Index { get; set; }
 }

 public class GetPromotionsPageResponse : ResponseBase
 {
     public int Length { get; set; }
     public List<PromotionDto> Entities { get; set; }
 }

 public class GetPromotionsPageHandler : IRequestHandler<GetPromotionsPageRequest, GetPromotionsPageResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public GetPromotionsPageHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<GetPromotionsPageResponse> Handle(GetPromotionsPageRequest request, CancellationToken cancellationToken)
     {
         var query = from promotion in _context.Promotions
                     select promotion;

         var length = await _context.Promotions.CountAsync();

         var promotions = await query.Page(request.Index, request.PageSize)
             .Select(x => x.ToDto()).ToListAsync();

         return new()
         {
             Length = length,
             Entities = promotions
         };
     }

 }
