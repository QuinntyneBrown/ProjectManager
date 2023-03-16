using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace ProjectManager.Api.Features;

 public class UpdateDashboardValidator : AbstractValidator<UpdateDashboardRequest>
 {
     public UpdateDashboardValidator()
     {
         RuleFor(request => request.Dashboard).NotNull();
         RuleFor(request => request.Dashboard).SetValidator(new DashboardValidator());
     }

 }

 public class UpdateDashboardRequest : IRequest<UpdateDashboardResponse>
 {
     public DashboardDto Dashboard { get; set; }
 }

 public class UpdateDashboardResponse : ResponseBase
 {
     public DashboardDto Dashboard { get; set; }
 }

 public class UpdateDashboardHandler : IRequestHandler<UpdateDashboardRequest, UpdateDashboardResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public UpdateDashboardHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<UpdateDashboardResponse> Handle(UpdateDashboardRequest request, CancellationToken cancellationToken)
     {
         var dashboard = await _context.Dashboards.SingleAsync(x => x.DashboardId == request.Dashboard.DashboardId);

         await _context.SaveChangesAsync(cancellationToken);

         return new UpdateDashboardResponse()
         {
             Dashboard = dashboard.ToDto()
         };
     }

 }
