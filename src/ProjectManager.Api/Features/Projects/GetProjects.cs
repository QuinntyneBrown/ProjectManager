using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace ProjectManager.Api.Features;

 public class GetProjectsRequest : IRequest<GetProjectsResponse> { }

 public class GetProjectsResponse : ResponseBase
 {
     public List<ProjectDto> Projects { get; set; }
 }

 public class GetProjectsHandler : IRequestHandler<GetProjectsRequest, GetProjectsResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public GetProjectsHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<GetProjectsResponse> Handle(GetProjectsRequest request, CancellationToken cancellationToken)
     {
         return new()
         {
             Projects = await _context.Projects.Select(x => x.ToDto()).ToListAsync()
         };
     }

 }
