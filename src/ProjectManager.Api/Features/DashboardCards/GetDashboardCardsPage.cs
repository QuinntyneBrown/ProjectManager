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

 public class GetDashboardCardsPageRequest : IRequest<GetDashboardCardsPageResponse>
 {
     public int PageSize { get; set; }
     public int Index { get; set; }
 }

 public class GetDashboardCardsPageResponse : ResponseBase
 {
     public int Length { get; set; }
     public List<DashboardCardDto> Entities { get; set; }
 }

 public class GetDashboardCardsPageHandler : IRequestHandler<GetDashboardCardsPageRequest, GetDashboardCardsPageResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public GetDashboardCardsPageHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<GetDashboardCardsPageResponse> Handle(GetDashboardCardsPageRequest request, CancellationToken cancellationToken)
     {
         var query = from dashboardCard in _context.DashboardCards
                     select dashboardCard;

         var length = await _context.DashboardCards.CountAsync();

         var dashboardCards = await query.Page(request.Index, request.PageSize)
             .Select(x => x.ToDto()).ToListAsync();

         return new()
         {
             Length = length,
             Entities = dashboardCards
         };
     }

 }
