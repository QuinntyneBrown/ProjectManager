using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using AngularCaching.Api.Models;
using AngularCaching.Api.Core;
using AngularCaching.Api.Interfaces;

namespace AngularCaching.Api.Features
{
    public class CreateToDo
    {
        public class Validator : AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(request => request.ToDo).NotNull();
                RuleFor(request => request.ToDo).SetValidator(new ToDoValidator());
            }

        }

        public class Request : IRequest<Response>
        {
            public ToDoDto ToDo { get; set; }
        }

        public class Response : ResponseBase
        {
            public ToDoDto ToDo { get; set; }
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IAngularCachingDbContext _context;

            public Handler(IAngularCachingDbContext context)
                => _context = context;

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var toDo = new ToDo(new(request.ToDo.Description));

                _context.ToDos.Add(toDo);

                await _context.SaveChangesAsync(cancellationToken);

                return new()
                {
                    ToDo = toDo.ToDto()
                };
            }

        }
    }
}
