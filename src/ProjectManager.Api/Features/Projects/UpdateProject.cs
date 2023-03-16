using ProjectManager.Api.Core;
using ProjectManager.Api.DomainEvents;
using ProjectManager.Api.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;


namespace ProjectManager.Api.Features;

 public class UpdateProjectValidator : AbstractValidator<UpdateProjectRequest>
 {
     public UpdateProjectValidator()
     {
         RuleFor(request => request.Project).NotNull();
         RuleFor(request => request.Project).SetValidator(new ProjectValidator());
     }

 }

 public class UpdateProjectRequest : IRequest<UpdateProjectResponse>
 {
     public ProjectDto Project { get; set; }
 }

 public class UpdateProjectResponse : ResponseBase
 {
     public ProjectDto Project { get; set; }
 }

 public class UpdateProjectHandler : IRequestHandler<UpdateProjectRequest, UpdateProjectResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public UpdateProjectHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<UpdateProjectResponse> Handle(UpdateProjectRequest request, CancellationToken cancellationToken)
     {
         var project = await _context.Projects.SingleAsync(x => x.ProjectId == request.Project.ProjectId);

         project.Apply(new UpdateDueDate(request.Project.DueDate));

         await _context.SaveChangesAsync(cancellationToken);

         return new()
         {
             Project = project.ToDto()
         };
     }

 }
