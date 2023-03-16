using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;


namespace ProjectManager.Api.Features;

 public class UpdateDashboardCardTypeValidator : AbstractValidator<UpdateDashboardCardTypeRequest>
 {
     public UpdateDashboardCardTypeValidator()
     {
         RuleFor(request => request.DashboardCard).NotNull();
         RuleFor(request => request.DashboardCard).SetValidator(new DashboardCardValidator());
     }

 }

 public class UpdateDashboardCardTypeRequest : IRequest<UpdateDashboardCardTypeResponse>
 {
     public DashboardCardDto DashboardCard { get; set; }
 }

 public class UpdateDashboardCardTypeResponse : ResponseBase
 {
     public DashboardCardDto DashboardCard { get; set; }
 }

 public class UpdateDashboardCardTypeHandler : IRequestHandler<UpdateDashboardCardTypeRequest, UpdateDashboardCardTypeResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public UpdateDashboardCardTypeHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<UpdateDashboardCardTypeResponse> Handle(UpdateDashboardCardTypeRequest request, CancellationToken cancellationToken)
     {
         var dashboardCard = await _context.DashboardCards.SingleAsync(x => x.DashboardCardId == request.DashboardCard.DashboardCardId);

         dashboardCard.Apply(new DomainEvents.UpdateDashboardCardType(request.DashboardCard.CardType));

         await _context.SaveChangesAsync(cancellationToken);

         return new UpdateDashboardCardTypeResponse()
         {
             DashboardCard = dashboardCard.ToDto()
         };
     }

 }
