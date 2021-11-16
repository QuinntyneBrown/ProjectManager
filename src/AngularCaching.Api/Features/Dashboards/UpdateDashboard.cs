using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using AngularCaching.Api.Core;
using AngularCaching.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AngularCaching.Api.Features
{
    public class UpdateDashboard
    {
        public class Validator: AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(request => request.Dashboard).NotNull();
                RuleFor(request => request.Dashboard).SetValidator(new DashboardValidator());
            }
        
        }

        public class Request: IRequest<Response>
        {
            public DashboardDto Dashboard { get; set; }
        }

        public class Response: ResponseBase
        {
            public DashboardDto Dashboard { get; set; }
        }

        public class Handler: IRequestHandler<Request, Response>
        {
            private readonly IAngularCachingDbContext _context;
        
            public Handler(IAngularCachingDbContext context)
                => _context = context;
        
            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var dashboard = await _context.Dashboards.SingleAsync(x => x.DashboardId == request.Dashboard.DashboardId);
                
                await _context.SaveChangesAsync(cancellationToken);
                
                return new Response()
                {
                    Dashboard = dashboard.ToDto()
                };
            }
            
        }
    }
}
