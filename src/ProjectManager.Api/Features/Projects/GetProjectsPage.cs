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

 public class GetProjectsPageRequest : IRequest<GetProjectsPageResponse>
 {
     public int PageSize { get; set; }
     public int Index { get; set; }
 }

 public class GetProjectsPageResponse : ResponseBase
 {
     public int Length { get; set; }
     public List<ProjectDto> Entities { get; set; }
 }

 public class GetProjectsPageHandler : IRequestHandler<GetProjectsPageRequest, GetProjectsPageResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public GetProjectsPageHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<GetProjectsPageResponse> Handle(GetProjectsPageRequest request, CancellationToken cancellationToken)
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
