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

 public class GetDashboardsRequest : IRequest<GetDashboardsResponse> { }

 public class GetDashboardsResponse : ResponseBase
 {
     public List<DashboardDto> Dashboards { get; set; }
 }

 public class GetDashboardsHandler : IRequestHandler<GetDashboardsRequest, GetDashboardsResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public GetDashboardsHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<GetDashboardsResponse> Handle(GetDashboardsRequest request, CancellationToken cancellationToken)
     {
         return new()
         {
             Dashboards = await _context.Dashboards.Select(x => x.ToDto()).ToListAsync()
         };
     }

 }
