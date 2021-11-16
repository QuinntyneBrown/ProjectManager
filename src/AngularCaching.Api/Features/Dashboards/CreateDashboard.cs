using AngularCaching.Api.Core;
using AngularCaching.Api.Interfaces;
using AngularCaching.Api.Models;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace AngularCaching.Api.Features
{
    public class CreateDashboard
    {
        public class Validator : AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(request => request.Dashboard).NotNull();
                RuleFor(request => request.Dashboard).SetValidator(new DashboardValidator());
            }

        }

        public class Request : IRequest<Response>
        {
            public DashboardDto Dashboard { get; set; }
        }

        public class Response : ResponseBase
        {
            public DashboardDto Dashboard { get; set; }
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IAngularCachingDbContext _context;

            public Handler(IAngularCachingDbContext context)
                => _context = context;

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var dashboard = new Dashboard(request.Dashboard.Name, request.Dashboard.Username);

                _context.Dashboards.Add(dashboard);

                await _context.SaveChangesAsync(cancellationToken);

                return new Response()
                {
                    Dashboard = dashboard.ToDto()
                };
            }

        }
    }
}
