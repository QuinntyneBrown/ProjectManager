using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace ProjectManager.Api.Features;

 public class GetDashboardByIdRequest : IRequest<GetDashboardByIdResponse>
 {
     public Guid DashboardId { get; set; }
 }

 public class GetDashboardByIdResponse : ResponseBase
 {
     public DashboardDto Dashboard { get; set; }
 }

 public class GetDashboardByIdHandler : IRequestHandler<GetDashboardByIdRequest, GetDashboardByIdResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public GetDashboardByIdHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<GetDashboardByIdResponse> Handle(GetDashboardByIdRequest request, CancellationToken cancellationToken)
     {
         return new()
         {
             Dashboard = (await _context.Dashboards.SingleOrDefaultAsync(x => x.DashboardId == request.DashboardId)).ToDto()
         };
     }

 }
