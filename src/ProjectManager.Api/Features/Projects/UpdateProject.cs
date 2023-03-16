using ProjectManager.Api.Core;
using ProjectManager.Api.DomainEvents;
using ProjectManager.Api.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;


namespace ProjectManager.Api.Features;

public class UpdateProject
{
    public class Validator : AbstractValidator<Request>
    {
        public Validator()
        {
            RuleFor(request => request.Project).NotNull();
            RuleFor(request => request.Project).SetValidator(new ProjectValidator());
        }

    }

    public class Request : IRequest<Response>
    {
        public ProjectDto Project { get; set; }
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
            var project = await _context.Projects.SingleAsync(x => x.ProjectId == request.Project.ProjectId);

            project.Apply(new UpdateDueDate(request.Project.DueDate));

            await _context.SaveChangesAsync(cancellationToken);

            return new()
            {
                Project = project.ToDto()
            };
        }

    }
}
