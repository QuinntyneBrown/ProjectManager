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

 public class RemoveProjectRequest : IRequest<RemoveProjectResponse>
 {
     public Guid ProjectId { get; set; }
 }

 public class RemoveProjectResponse : ResponseBase
 {
     public ProjectDto Project { get; set; }
 }

 public class RemoveProjectHandler : IRequestHandler<RemoveProjectRequest, RemoveProjectResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public RemoveProjectHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<RemoveProjectResponse> Handle(RemoveProjectRequest request, CancellationToken cancellationToken)
     {
         var project = await _context.Projects.SingleAsync(x => x.ProjectId == request.ProjectId);

         _context.Projects.Remove(project);

         await _context.SaveChangesAsync(cancellationToken);

         return new RemoveProjectResponse()
         {
             Project = project.ToDto()
         };
     }

 }
