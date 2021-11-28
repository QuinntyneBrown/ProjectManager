using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System;
using ProjectManager.Api.Models;
using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;

namespace ProjectManager.Api.Features
{
    public class RemoveToDo
    {
        public class Request : IRequest<Response>
        {
            public Guid ToDoId { get; set; }
        }

        public class Response : ResponseBase
        {
            public ToDoDto ToDo { get; set; }
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IProjectManagerDbContext _context;

            public Handler(IProjectManagerDbContext context)
                => _context = context;

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var toDo = await _context.ToDos.SingleAsync(x => x.ToDoId == request.ToDoId);

                toDo.Apply(new DomainEvents.DeleteToDo());

                await _context.SaveChangesAsync(cancellationToken);

                return new Response()
                {
                    ToDo = toDo.ToDto()
                };
            }

        }
    }
}
