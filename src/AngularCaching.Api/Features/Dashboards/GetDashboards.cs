using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using AngularCaching.Api.Core;
using AngularCaching.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AngularCaching.Api.Features
{
    public class GetDashboards
    {
        public class Request: IRequest<Response> { }

        public class Response: ResponseBase
        {
            public List<DashboardDto> Dashboards { get; set; }
        }

        public class Handler: IRequestHandler<Request, Response>
        {
            private readonly IAngularCachingDbContext _context;
        
            public Handler(IAngularCachingDbContext context)
                => _context = context;
        
            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                return new () {
                    Dashboards = await _context.Dashboards.Select(x => x.ToDto()).ToListAsync()
                };
            }
            
        }
    }
}
