using AngularCaching.Api.Core;
using AngularCaching.Api.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace AngularCaching.Api.Features
{
    public class GetProjectByName
    {
        public class Request : IRequest<Response>
        {
            public string Name { get; set; }
        }

        public class Response : ResponseBase
        {
            public ProjectDto Project { get; set; }
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IAngularCachingDbContext _context;

            public Handler(IAngularCachingDbContext context)
                => _context = context;

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                return new()
                {
                    Project = (await _context.Projects.SingleOrDefaultAsync(x => x.Name == request.Name)).ToDto()
                };
            }

        }
    }
}
