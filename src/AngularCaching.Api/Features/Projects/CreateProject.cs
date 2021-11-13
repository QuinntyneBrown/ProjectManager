using AngularCaching.Api.Core;
using AngularCaching.Api.Interfaces;
using AngularCaching.Api.Models;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace AngularCaching.Api.Features
{
    public class CreateProject
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
                var project = new Project(new(request.Project.Name));

                _context.Projects.Add(project);

                await _context.SaveChangesAsync(cancellationToken);

                return new Response()
                {
                    Project = project.ToDto()
                };
            }

        }
    }
}
