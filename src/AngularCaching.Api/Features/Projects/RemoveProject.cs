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
    public class RemoveProject
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
                var project = await _context.Projects.SingleAsync(x => x.ProjectId == request.ProjectId);
                
                _context.Projects.Remove(project);
                
                await _context.SaveChangesAsync(cancellationToken);
                
                return new Response()
                {
                    Project = project.ToDto()
                };
            }
            
        }
    }
}
