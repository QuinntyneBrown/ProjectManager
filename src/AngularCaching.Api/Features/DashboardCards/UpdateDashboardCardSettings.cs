using AngularCaching.Api.Core;
using AngularCaching.Api.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace AngularCaching.Api.Features
{
    public class UpdateDashboardCardSettings
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
                var dashboardCard = await _context.DashboardCards.SingleAsync(x => x.DashboardCardId == request.DashboardCard.DashboardCardId);

                dashboardCard.Apply(new DomainEvents.UpdateDashboardCardSettings(request.DashboardCard.Settings));

                await _context.SaveChangesAsync(cancellationToken);

                return new Response()
                {
                    DashboardCard = dashboardCard.ToDto()
                };
            }

        }
    }
}