using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace ProjectManager.Api.Features;

 public class GetToDoByIdRequest : IRequest<GetToDoByIdResponse>
 {
     public Guid ToDoId { get; set; }
 }

 public class GetToDoByIdResponse : ResponseBase
 {
     public ToDoDto ToDo { get; set; }
 }

 public class GetToDoByIdHandler : IRequestHandler<GetToDoByIdRequest, GetToDoByIdResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public GetToDoByIdHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<GetToDoByIdResponse> Handle(GetToDoByIdRequest request, CancellationToken cancellationToken)
     {
         return new()
         {
             ToDo = (await _context.ToDos.SingleOrDefaultAsync(x => x.ToDoId == request.ToDoId)).ToDto()
         };
     }

 }
