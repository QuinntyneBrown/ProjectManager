using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using ProjectManager.Api.Models;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;


namespace ProjectManager.Api.Features;

 public class CreateDashboardValidator : AbstractValidator<CreateDashboardRequest>
 {
     public CreateDashboardValidator()
     {
         RuleFor(request => request.Dashboard).NotNull();
         RuleFor(request => request.Dashboard).SetValidator(new DashboardValidator());
     }

 }

 public class CreateDashboardRequest : IRequest<CreateDashboardResponse>
 {
     public DashboardDto Dashboard { get; set; }
 }

 public class CreateDashboardResponse : ResponseBase
 {
     public DashboardDto Dashboard { get; set; }
 }

 public class CreateDashboardHandler : IRequestHandler<CreateDashboardRequest, CreateDashboardResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public CreateDashboardHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<CreateDashboardResponse> Handle(CreateDashboardRequest request, CancellationToken cancellationToken)
     {
         var dashboard = new Dashboard(request.Dashboard.Name, request.Dashboard.Username);

         _context.Dashboards.Add(dashboard);

         await _context.SaveChangesAsync(cancellationToken);

         return new CreateDashboardResponse()
         {
             Dashboard = dashboard.ToDto()
         };
     }

 }
