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

 public class GetDashboardsPageRequest : IRequest<GetDashboardsPageResponse>
 {
     public int PageSize { get; set; }
     public int Index { get; set; }
 }

 public class GetDashboardsPageResponse : ResponseBase
 {
     public int Length { get; set; }
     public List<DashboardDto> Entities { get; set; }
 }

 public class GetDashboardsPageHandler : IRequestHandler<GetDashboardsPageRequest, GetDashboardsPageResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public GetDashboardsPageHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<GetDashboardsPageResponse> Handle(GetDashboardsPageRequest request, CancellationToken cancellationToken)
     {
         var query = from dashboard in _context.Dashboards
                     select dashboard;

         var length = await _context.Dashboards.CountAsync();

         var dashboards = await query.Page(request.Index, request.PageSize)
             .Select(x => x.ToDto()).ToListAsync();

         return new()
         {
             Length = length,
             Entities = dashboards
         };
     }

 }
