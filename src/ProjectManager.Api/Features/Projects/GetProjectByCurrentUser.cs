using ProjectManager.Api.Core;
using ProjectManager.Api.DomainEvents;
using ProjectManager.Api.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;


namespace ProjectManager.Api.Features;

 public class GetProjectByCurrentUserRequest : IRequest<GetProjectByCurrentUserResponse> { }

 public class GetProjectByCurrentUserResponse : ResponseBase
 {
     public ProjectDto Project { get; set; }
 }

 public class GetProjectByCurrentUserHandler : IRequestHandler<GetProjectByCurrentUserRequest, GetProjectByCurrentUserResponse>
 {
     private readonly IProjectManagerDbContext _context;
     private readonly IOrchestrationHandler _orchestrationHandler;

     public GetProjectByCurrentUserHandler(IProjectManagerDbContext context, IOrchestrationHandler orchestrationHandler)
     {
         _context = context;
         _orchestrationHandler = orchestrationHandler;
     }

     public async Task<GetProjectByCurrentUserResponse> Handle(GetProjectByCurrentUserRequest request, CancellationToken cancellationToken)
     {
         return await _orchestrationHandler.Handle<GetProjectByCurrentUserResponse>(new QueryCurrentUser(), (tcs) => async message =>
         {
             switch (message)
             {
                 case QueriedCurrentUser queriedCurrentUser:

                     var project = await _context.Projects.SingleOrDefaultAsync(x => x.Name == queriedCurrentUser.User.CurrentProjectName);

                     tcs.SetResult(new GetProjectByCurrentUserResponse()
                     {
                         Project = project.ToDto()
                     });
                     break;
             }
         });
     }

 }
