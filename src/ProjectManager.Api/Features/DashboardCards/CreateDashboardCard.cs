using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using ProjectManager.Api.Models;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;


namespace ProjectManager.Api.Features;

 public class CreateDashboardCardValidator : AbstractValidator<CreateDashboardCardRequest>
 {
     public CreateDashboardCardValidator()
     {
         RuleFor(request => request.DashboardCard).NotNull();
         RuleFor(request => request.DashboardCard).SetValidator(new DashboardCardValidator());
     }
 }

 public class CreateDashboardCardRequest : IRequest<CreateDashboardCardResponse>
 {
     public DashboardCardDto DashboardCard { get; set; }
 }

 public class CreateDashboardCardResponse : ResponseBase
 {
     public DashboardCardDto DashboardCard { get; set; }
 }

 public class CreateDashboardCardHandler : IRequestHandler<CreateDashboardCardRequest, CreateDashboardCardResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public CreateDashboardCardHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<CreateDashboardCardResponse> Handle(CreateDashboardCardRequest request, CancellationToken cancellationToken)
     {
         var dashboardCard = new DashboardCard(new DomainEvents.CreateDashboardCard(request.DashboardCard.CardType, request.DashboardCard.Dashboard, request.DashboardCard.Settings));

         _context.DashboardCards.Add(dashboardCard);

         await _context.SaveChangesAsync(cancellationToken);

         return new()
         {
             DashboardCard = dashboardCard.ToDto()
         };
     }
 }
