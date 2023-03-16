using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using ProjectManager.Api.Models;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;


namespace ProjectManager.Api.Features;

 public class CreateToDoValidator : AbstractValidator<CreateToDoRequest>
 {
     public CreateToDoValidator()
     {
         RuleFor(request => request.ToDo).NotNull();
         RuleFor(request => request.ToDo).SetValidator(new ToDoValidator());
     }

 }

 public class CreateToDoRequest : IRequest<CreateToDoResponse>
 {
     public ToDoDto ToDo { get; set; }
 }

 public class CreateToDoResponse : ResponseBase
 {
     public ToDoDto ToDo { get; set; }
 }

 public class CreateToDoHandler : IRequestHandler<CreateToDoRequest, CreateToDoResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public CreateToDoHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<CreateToDoResponse> Handle(CreateToDoRequest request, CancellationToken cancellationToken)
     {
         var toDo = new ToDo(new(request.ToDo.ProjectName, request.ToDo.Description));

         _context.ToDos.Add(toDo);

         await _context.SaveChangesAsync(cancellationToken);

         return new()
         {
             ToDo = toDo.ToDto()
         };
     }

 }
