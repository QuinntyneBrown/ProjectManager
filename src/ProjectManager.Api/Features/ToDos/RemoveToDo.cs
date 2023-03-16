using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System;
using ProjectManager.Api.Models;
using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;


namespace ProjectManager.Api.Features;

 public class RemoveToDoRequest : IRequest<RemoveToDoResponse>
 {
     public Guid ToDoId { get; set; }
 }

 public class RemoveToDoResponse : ResponseBase
 {
     public ToDoDto ToDo { get; set; }
 }

 public class RemoveToDoHandler : IRequestHandler<RemoveToDoRequest, RemoveToDoResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public RemoveToDoHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<RemoveToDoResponse> Handle(RemoveToDoRequest request, CancellationToken cancellationToken)
     {
         var toDo = await _context.ToDos.SingleAsync(x => x.ToDoId == request.ToDoId);

         toDo.Apply(new DomainEvents.DeleteToDo());

         await _context.SaveChangesAsync(cancellationToken);

         return new RemoveToDoResponse()
         {
             ToDo = toDo.ToDto()
         };
     }

 }
