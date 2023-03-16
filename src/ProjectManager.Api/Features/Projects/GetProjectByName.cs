using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;


namespace ProjectManager.Api.Features;

 public class GetProjectByNameRequest : IRequest<GetProjectByNameResponse>
 {
     public string Name { get; set; }
 }

 public class GetProjectByNameResponse : ResponseBase
 {
     public ProjectDto Project { get; set; }
 }

 public class GetProjectByNameHandler : IRequestHandler<GetProjectByNameRequest, GetProjectByNameResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public GetProjectByNameHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<GetProjectByNameResponse> Handle(GetProjectByNameRequest request, CancellationToken cancellationToken)
     {
         return new()
         {
             Project = (await _context.Projects.SingleOrDefaultAsync(x => x.Name == request.Name)).ToDto()
         };
     }

 }
