using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ProjectManager.Api.Features
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
            private readonly IProjectManagerDbContext _context;
        
            public Handler(IProjectManagerDbContext context)
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
