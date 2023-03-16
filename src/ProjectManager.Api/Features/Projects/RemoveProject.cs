using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System;
using ProjectManager.Api.Models;
using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;


namespace ProjectManager.Api.Features;

public class RemoveProject
{
    public class Request : IRequest<Response>
    {
        public Guid ProjectId { get; set; }
    }

    public class Response : ResponseBase
    {
        public ProjectDto Project { get; set; }
    }

    public class Handler : IRequestHandler<Request, Response>
    {
        private readonly IProjectManagerDbContext _context;

        public Handler(IProjectManagerDbContext context)
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
