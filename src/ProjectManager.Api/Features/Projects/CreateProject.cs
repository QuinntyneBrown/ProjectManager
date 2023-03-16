using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using ProjectManager.Api.Models;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;


namespace ProjectManager.Api.Features;

 public class CreateProjectValidator : AbstractValidator<CreateProjectRequest>
 {
     public CreateProjectValidator()
     {
         RuleFor(request => request.Project).NotNull();
         RuleFor(request => request.Project).SetValidator(new ProjectValidator());
     }

 }

 public class CreateProjectRequest : IRequest<CreateProjectResponse>
 {
     public ProjectDto Project { get; set; }
 }

 public class CreateProjectResponse : ResponseBase
 {
     public ProjectDto Project { get; set; }
 }

 public class CreateProjectHandler : IRequestHandler<CreateProjectRequest, CreateProjectResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public CreateProjectHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<CreateProjectResponse> Handle(CreateProjectRequest request, CancellationToken cancellationToken)
     {
         var project = new Project(new(request.Project.Name, request.Project.DueDate));

         _context.Projects.Add(project);

         await _context.SaveChangesAsync(cancellationToken);

         return new CreateProjectResponse()
         {
             Project = project.ToDto()
         };
     }

 }
