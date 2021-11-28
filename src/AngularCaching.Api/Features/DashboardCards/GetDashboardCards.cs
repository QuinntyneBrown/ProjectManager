using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ProjectManager.Api.Features
{
    public class GetDashboardCards
    {
        public class Request: IRequest<Response> { }

        public class Response: ResponseBase
        {
            public List<DashboardCardDto> DashboardCards { get; set; }
        }

        public class Handler: IRequestHandler<Request, Response>
        {
            private readonly IProjectManagerDbContext _context;
        
            public Handler(IProjectManagerDbContext context)
                => _context = context;
        
            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                return new () {
                    DashboardCards = await _context.DashboardCards.Select(x => x.ToDto()).ToListAsync()
                };
            }
            
        }
    }
}
