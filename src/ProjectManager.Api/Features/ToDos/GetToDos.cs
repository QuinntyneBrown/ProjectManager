using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;


namespace ProjectManager.Api.Features;

 public class GetToDosRequest : IRequest<GetToDosResponse> { }

 public class GetToDosResponse : ResponseBase
 {
     public List<ToDoDto> ToDos { get; set; }
 }

 public class GetToDosHandler : IRequestHandler<GetToDosRequest, GetToDosResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public GetToDosHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<GetToDosResponse> Handle(GetToDosRequest request, CancellationToken cancellationToken)
     {
         return new()
         {
             ToDos = await _context.ToDos.Select(x => x.ToDto()).ToListAsync()
         };
     }

 }
