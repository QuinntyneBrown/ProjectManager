using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using ProjectManager.Api.Extensions;
using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using ProjectManager.Api.Extensions;
using Microsoft.EntityFrameworkCore;


namespace ProjectManager.Api.Features;

public class GetProjectsPage
{
    public class Request : IRequest<Response>
    {
        public int PageSize { get; set; }
        public int Index { get; set; }
    }

    public class Response : ResponseBase
    {
        public int Length { get; set; }
        public List<ProjectDto> Entities { get; set; }
    }

    public class Handler : IRequestHandler<Request, Response>
    {
        private readonly IProjectManagerDbContext _context;

        public Handler(IProjectManagerDbContext context)
            => _context = context;

        public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
        {
            var query = from project in _context.Projects
                        select project;

            var length = await _context.Projects.CountAsync();

            var projects = await query.Page(request.Index, request.PageSize)
                .Select(x => x.ToDto()).ToListAsync();

            return new()
            {
                Length = length,
                Entities = projects
            };
        }

    }
}
