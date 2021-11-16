using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using AngularCaching.Api.Core;
using AngularCaching.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AngularCaching.Api.Features
{
    public class GetDashboardById
    {
        public class Request: IRequest<Response>
        {
            public Guid DashboardId { get; set; }
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
                return new () {
                    Dashboard = (await _context.Dashboards.SingleOrDefaultAsync(x => x.DashboardId == request.DashboardId)).ToDto()
                };
            }
            
        }
    }
}
