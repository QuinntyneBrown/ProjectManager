using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace ProjectManager.Api.Features;

 public class UpdateToDoValidator : AbstractValidator<UpdateToDoRequest>
 {
     public UpdateToDoValidator()
     {
         RuleFor(request => request.ToDo).NotNull();
         RuleFor(request => request.ToDo).SetValidator(new ToDoValidator());
     }

 }

 public class UpdateToDoRequest : IRequest<UpdateToDoResponse>
 {
     public ToDoDto ToDo { get; set; }
 }

 public class UpdateToDoResponse : ResponseBase
 {
     public ToDoDto ToDo { get; set; }
 }

 public class UpdateToDoHandler : IRequestHandler<UpdateToDoRequest, UpdateToDoResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public UpdateToDoHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<UpdateToDoResponse> Handle(UpdateToDoRequest request, CancellationToken cancellationToken)
     {
         var toDo = await _context.ToDos.SingleAsync(x => x.ToDoId == request.ToDo.ToDoId);

         toDo.Apply(new DomainEvents.UpdateToDo(request.ToDo.Description, request.ToDo.Status));
         await _context.SaveChangesAsync(cancellationToken);

         return new UpdateToDoResponse()
         {
             ToDo = toDo.ToDto()
         };
     }

 }
