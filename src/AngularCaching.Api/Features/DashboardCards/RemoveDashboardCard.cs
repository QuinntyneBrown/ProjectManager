using AngularCaching.Api.Core;
using AngularCaching.Api.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace AngularCaching.Api.Features
{
    public class RemoveDashboardCard
    {
        public class Request : IRequest<Response>
        {
            public Guid DashboardCardId { get; set; }
        }

        public class Response : ResponseBase
        {
            public DashboardCardDto DashboardCard { get; set; }
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IAngularCachingDbContext _context;

            public Handler(IAngularCachingDbContext context)
                => _context = context;

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
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
    }
}
