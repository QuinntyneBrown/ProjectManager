using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using AngularCaching.Api.Extensions;
using AngularCaching.Api.Core;
using AngularCaching.Api.Interfaces;
using AngularCaching.Api.Extensions;
using Microsoft.EntityFrameworkCore;

namespace AngularCaching.Api.Features
{
    public class GetDashboardsPage
    {
        public class Request: IRequest<Response>
        {
            public int PageSize { get; set; }
            public int Index { get; set; }
        }

        public class Response: ResponseBase
        {
            public int Length { get; set; }
            public List<DashboardDto> Entities { get; set; }
        }

        public class Handler: IRequestHandler<Request, Response>
        {
            private readonly IAngularCachingDbContext _context;
        
            public Handler(IAngularCachingDbContext context)
                => _context = context;
        
            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var query = from dashboard in _context.Dashboards
                    select dashboard;
                
                var length = await _context.Dashboards.CountAsync();
                
                var dashboards = await query.Page(request.Index, request.PageSize)
                    .Select(x => x.ToDto()).ToListAsync();
                
                return new()
                {
                    Length = length,
                    Entities = dashboards
                };
            }
            
        }
    }
}
