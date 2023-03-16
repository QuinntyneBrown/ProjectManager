using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using ProjectManager.Api.Models;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;


namespace ProjectManager.Api.Features;

public class CreateUser
{
    public class Validator : AbstractValidator<Request>
    {
        public Validator()
        {
            RuleFor(request => request.User).NotNull();
            RuleFor(request => request.User).SetValidator(new UserValidator());
        }

    }

    public class Request : IRequest<Response>
    {
        public UserDto User { get; set; }
    }

    public class Response : ResponseBase
    {
        public UserDto User { get; set; }
    }

    public class Handler : IRequestHandler<Request, Response>
    {
        private readonly IProjectManagerDbContext _context;
        private readonly IPasswordHasher _passwordHasher;

        public Handler(IProjectManagerDbContext context)
            => _context = context;

        public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
        {
            var user = new User(new(request.User.Name, request.User.CurrentProjectName, null, _passwordHasher));

            _context.Users.Add(user);

            await _context.SaveChangesAsync(cancellationToken);

            return new Response()
            {
                User = user.ToDto()
            };
        }

    }
}
