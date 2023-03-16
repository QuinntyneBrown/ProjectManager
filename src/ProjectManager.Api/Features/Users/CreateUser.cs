using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using ProjectManager.Api.Models;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;


namespace ProjectManager.Api.Features;

 public class CreateUserValidator : AbstractValidator<CreateUserRequest>
 {
     public CreateUserValidator()
     {
         RuleFor(request => request.User).NotNull();
         RuleFor(request => request.User).SetValidator(new UserValidator());
     }

 }

 public class CreateUserRequest : IRequest<CreateUserResponse>
 {
     public UserDto User { get; set; }
 }

 public class CreateUserResponse : ResponseBase
 {
     public UserDto User { get; set; }
 }

 public class CreateUserHandler : IRequestHandler<CreateUserRequest, CreateUserResponse>
 {
     private readonly IProjectManagerDbContext _context;
     private readonly IPasswordHasher _passwordHasher;

     public CreateUserHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<CreateUserResponse> Handle(CreateUserRequest request, CancellationToken cancellationToken)
     {
         var user = new User(new(request.User.Name, request.User.CurrentProjectName, null, _passwordHasher));

         _context.Users.Add(user);

         await _context.SaveChangesAsync(cancellationToken);

         return new CreateUserResponse()
         {
             User = user.ToDto()
         };
     }

 }
