using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;


namespace ProjectManager.Api.Features;

 public class GetToDosByProjectNameRequest : IRequest<GetToDosByProjectNameResponse>
 {
     public string Name { get; set; }
 }

 public class GetToDosByProjectNameResponse : ResponseBase
 {
     public List<ToDoDto> ToDos { get; set; }
 }

 public class GetToDosByProjectNameHandler : IRequestHandler<GetToDosByProjectNameRequest, GetToDosByProjectNameResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public GetToDosByProjectNameHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<GetToDosByProjectNameResponse> Handle(GetToDosByProjectNameRequest request, CancellationToken cancellationToken)
     {
         return new()
         {
             ToDos = await _context.ToDos.Where(x => x.ProjectName == request.Name).Select(x => x.ToDto()).ToListAsync()
         };
     }

 }
