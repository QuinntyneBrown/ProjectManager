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

 public class RemoveDashboardRequest : IRequest<RemoveDashboardResponse>
 {
     public Guid DashboardId { get; set; }
 }

 public class RemoveDashboardResponse : ResponseBase
 {
     public DashboardDto Dashboard { get; set; }
 }

 public class RemoveDashboardHandler : IRequestHandler<RemoveDashboardRequest, RemoveDashboardResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public RemoveDashboardHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<RemoveDashboardResponse> Handle(RemoveDashboardRequest request, CancellationToken cancellationToken)
     {
         var dashboard = await _context.Dashboards.SingleAsync(x => x.DashboardId == request.DashboardId);

         _context.Dashboards.Remove(dashboard);

         await _context.SaveChangesAsync(cancellationToken);

         return new RemoveDashboardResponse()
         {
             Dashboard = dashboard.ToDto()
         };
     }

 }
