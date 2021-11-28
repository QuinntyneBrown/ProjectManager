using ProjectManager.Api.Core;
using ProjectManager.Api.DomainEvents;
using ProjectManager.Api.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace ProjectManager.Api.Features
{
    public class GetProjectByCurrentUser
    {
        public class Request : IRequest<Response> { }

        public class Response : ResponseBase
        {
            public ProjectDto Project { get; set; }
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IProjectManagerDbContext _context;
            private readonly IOrchestrationHandler _orchestrationHandler;

            public Handler(IProjectManagerDbContext context, IOrchestrationHandler orchestrationHandler)
            {
                _context = context;
                _orchestrationHandler = orchestrationHandler;
            }

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                return await _orchestrationHandler.Handle<Response>(new QueryCurrentUser(), (tcs) => async message =>
                {
                    switch (message)
                    {
                        case QueriedCurrentUser queriedCurrentUser:

                            var project = await _context.Projects.SingleOrDefaultAsync(x => x.Name == queriedCurrentUser.User.CurrentProjectName);

                            tcs.SetResult(new Response()
                            {
                                Project = project.ToDto()
                            });
                            break;
                    }
                });
            }

        }
    }
}
