using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ProjectManager.Api.Features
{
    public class GetDashboardCardById
    {
        public class Request: IRequest<Response>
        {
            public Guid DashboardCardId { get; set; }
        }

        public class Response: ResponseBase
        {
            public DashboardCardDto DashboardCard { get; set; }
        }

        public class Handler: IRequestHandler<Request, Response>
        {
            private readonly IProjectManagerDbContext _context;
        
            public Handler(IProjectManagerDbContext context)
                => _context = context;
        
            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                return new () {
                    DashboardCard = (await _context.DashboardCards.SingleOrDefaultAsync(x => x.DashboardCardId == request.DashboardCardId)).ToDto()
                };
            }
            
        }
    }
}
