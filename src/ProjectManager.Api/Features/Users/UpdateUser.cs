using ProjectManager.Api.Core;
using ProjectManager.Api.DomainEvents;
using ProjectManager.Api.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;


namespace ProjectManager.Api.Features;

 public class UpdateUserValidator : AbstractValidator<UpdateUserRequest>
 {
     public UpdateUserValidator()
     {
         RuleFor(request => request.User).NotNull();
         RuleFor(request => request.User).SetValidator(new UserValidator());
     }

 }

 public class UpdateUserRequest : IRequest<UpdateUserResponse>
 {
     public UserDto User { get; set; }
 }

 public class UpdateUserResponse : ResponseBase
 {
     public UserDto User { get; set; }
 }

 public class UpdateUserHandler : IRequestHandler<UpdateUserRequest, UpdateUserResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public UpdateUserHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<UpdateUserResponse> Handle(UpdateUserRequest request, CancellationToken cancellationToken)
     {
         var user = await _context.Users.SingleAsync(x => x.UserId == request.User.UserId);

         user.Apply(new SetCurrentProjectName(request.User.CurrentProjectName));

         await _context.SaveChangesAsync(cancellationToken);

         return new()
         {
             User = user.ToDto()
         };
     }

 }
