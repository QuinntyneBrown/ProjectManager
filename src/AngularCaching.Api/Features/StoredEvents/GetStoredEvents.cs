using AngularCaching.Api.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AngularCaching.Api.Features
{
    public class GetStoredEvents
    {
        public class Request : IRequest<Response>
        {
            public DateTime? Since { get; set; }
        }

        public class Response
        {
            public List<StoredEventDto> StoredEvents { get; set; }
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IAngularCachingDbContext _context;

            public Handler(IAngularCachingDbContext context) => _context = context;

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                return new Response()
                {
                    StoredEvents = _context.StoredEvents
                    .Where(x => x.CreatedOn > request.Since)
                    .Select(x => x.ToDto()).ToList()
                };
            }
        }
    }
}
