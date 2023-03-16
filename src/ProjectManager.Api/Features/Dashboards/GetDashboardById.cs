using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace ProjectManager.Api.Features;

public class GetDashboardById
{
    public class Request : IRequest<Response>
    {
        public Guid DashboardId { get; set; }
    }

    public class Response : ResponseBase
    {
        public DashboardDto Dashboard { get; set; }
    }

    public class Handler : IRequestHandler<Request, Response>
    {
        private readonly IProjectManagerDbContext _context;

        public Handler(IProjectManagerDbContext context)
            => _context = context;

        public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
        {
            return new()
            {
                Dashboard = (await _context.Dashboards.SingleOrDefaultAsync(x => x.DashboardId == request.DashboardId)).ToDto()
            };
        }

    }
}
