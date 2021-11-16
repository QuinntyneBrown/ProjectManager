using AngularCaching.Api.Core;
using AngularCaching.Api.Interfaces;
using AngularCaching.Api.Models;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace AngularCaching.Api.Features
{
    public class CreateDashboardCard
    {
        public class Validator : AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(request => request.DashboardCard).NotNull();
                RuleFor(request => request.DashboardCard).SetValidator(new DashboardCardValidator());
            }
        }

        public class Request : IRequest<Response>
        {
            public DashboardCardDto DashboardCard { get; set; }
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
                var dashboardCard = new DashboardCard(new DomainEvents.CreateDashboardCard(request.DashboardCard.CardType, request.DashboardCard.Dashboard, request.DashboardCard.Settings));

                _context.DashboardCards.Add(dashboardCard);

                await _context.SaveChangesAsync(cancellationToken);

                return new()
                {
                    DashboardCard = dashboardCard.ToDto()
                };
            }
        }
    }
}
