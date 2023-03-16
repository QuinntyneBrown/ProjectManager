using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;


namespace ProjectManager.Api.Features;

 public class UpdateDashboardCardSettingsValidator : AbstractValidator<UpdateDashboardCardSettingsRequest>
 {
     public UpdateDashboardCardSettingsValidator()
     {
         RuleFor(request => request.DashboardCard).NotNull();
         RuleFor(request => request.DashboardCard).SetValidator(new DashboardCardValidator());
     }

 }

 public class UpdateDashboardCardSettingsRequest : IRequest<UpdateDashboardCardSettingsResponse>
 {
     public DashboardCardDto DashboardCard { get; set; }
 }

 public class UpdateDashboardCardSettingsResponse : ResponseBase
 {
     public DashboardCardDto DashboardCard { get; set; }
 }

 public class UpdateDashboardCardSettingsHandler : IRequestHandler<UpdateDashboardCardSettingsRequest, UpdateDashboardCardSettingsResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public UpdateDashboardCardSettingsHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<UpdateDashboardCardSettingsResponse> Handle(UpdateDashboardCardSettingsRequest request, CancellationToken cancellationToken)
     {
         var dashboardCard = await _context.DashboardCards.SingleAsync(x => x.DashboardCardId == request.DashboardCard.DashboardCardId);

         dashboardCard.Apply(new DomainEvents.UpdateDashboardCardSettings(request.DashboardCard.Settings));

         await _context.SaveChangesAsync(cancellationToken);

         return new UpdateDashboardCardSettingsResponse()
         {
             DashboardCard = dashboardCard.ToDto()
         };
     }

 }
