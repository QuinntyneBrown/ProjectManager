using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System;
using AngularCaching.Api.Models;
using AngularCaching.Api.Core;
using AngularCaching.Api.Interfaces;

namespace AngularCaching.Api.Features
{
    public class RemoveDashboard
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
                var dashboard = await _context.Dashboards.SingleAsync(x => x.DashboardId == request.DashboardId);
                
                _context.Dashboards.Remove(dashboard);
                
                await _context.SaveChangesAsync(cancellationToken);
                
                return new Response()
                {
                    Dashboard = dashboard.ToDto()
                };
            }
            
        }
    }
}
