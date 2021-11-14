using AngularCaching.Api.Core;
using AngularCaching.Api.DomainEvents;
using AngularCaching.Api.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace AngularCaching.Api.Features
{
    public class UpdateUser
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
            private readonly IAngularCachingDbContext _context;

            public Handler(IAngularCachingDbContext context)
                => _context = context;

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
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
    }
}
