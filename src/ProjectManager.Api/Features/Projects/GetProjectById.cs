using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace ProjectManager.Api.Features;

 public class GetProjectByIdRequest : IRequest<GetProjectByIdResponse>
 {
     public Guid ProjectId { get; set; }
 }

 public class GetProjectByIdResponse : ResponseBase
 {
     public ProjectDto Project { get; set; }
 }

 public class GetProjectByIdHandler : IRequestHandler<GetProjectByIdRequest, GetProjectByIdResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public GetProjectByIdHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<GetProjectByIdResponse> Handle(GetProjectByIdRequest request, CancellationToken cancellationToken)
     {
         return new()
         {
             Project = (await _context.Projects.SingleOrDefaultAsync(x => x.ProjectId == request.ProjectId)).ToDto()
         };
     }

 }
