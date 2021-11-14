using AngularCaching.Api.Core;
using AngularCaching.Api.DomainEvents;
using AngularCaching.Api.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace AngularCaching.Api.Features
{
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
            private readonly IAngularCachingDbContext _context;

            public Handler(IAngularCachingDbContext context)
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
}
