using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using AngularCaching.Api.Core;
using AngularCaching.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AngularCaching.Api.Features
{
    public class GetProjectById
    {
        public class Request: IRequest<Response>
        {
            public Guid ProjectId { get; set; }
        }

        public class Response: ResponseBase
        {
            public ProjectDto Project { get; set; }
        }

        public class Handler: IRequestHandler<Request, Response>
        {
            private readonly IAngularCachingDbContext _context;
        
            public Handler(IAngularCachingDbContext context)
                => _context = context;
        
            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                return new () {
                    Project = (await _context.Projects.SingleOrDefaultAsync(x => x.ProjectId == request.ProjectId)).ToDto()
                };
            }
            
        }
    }
}
