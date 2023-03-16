using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;


namespace ProjectManager.Api.Features;

 public class RemoveDashboardCardRequest : IRequest<RemoveDashboardCardResponse>
 {
     public Guid DashboardCardId { get; set; }
 }

 public class RemoveDashboardCardResponse : ResponseBase
 {
     public DashboardCardDto DashboardCard { get; set; }
 }

 public class RemoveDashboardCardHandler : IRequestHandler<RemoveDashboardCardRequest, RemoveDashboardCardResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public RemoveDashboardCardHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<RemoveDashboardCardResponse> Handle(RemoveDashboardCardRequest request, CancellationToken cancellationToken)
     {
         var dashboardCard = await _context.DashboardCards.SingleAsync(x => x.DashboardCardId == request.DashboardCardId);

         dashboardCard.Apply(new DomainEvents.RemoveDashboardCard());

         _context.DashboardCards.Remove(dashboardCard);

         await _context.SaveChangesAsync(cancellationToken);

         return new()
         {
             DashboardCard = dashboardCard.ToDto()
         };
     }

 }
