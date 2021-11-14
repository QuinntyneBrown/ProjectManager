using AngularCaching.Api.Core;
using AngularCaching.Api.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AngularCaching.Api.Features
{
    public class GetPromotionsByProject
    {
        public class Request : IRequest<Response>
        {
            public Guid ProjectId { get; set; }
        }

        public class Response : ResponseBase
        {
            public List<PromotionDto> Promotions { get; set; }
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IAngularCachingDbContext _context;

            public Handler(IAngularCachingDbContext context)
                => _context = context;

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var project = await _context.Projects.SingleOrDefaultAsync(x => x.ProjectId == request.ProjectId);

                var todos = await (from toDo in _context.ToDos
                                   where toDo.ProjectName == project.Name
                                   select toDo).ToListAsync();

                var promotions = _context.Promotions.AsQueryable();

                if (project.Name == Constants.Projects.ChristmasShopping)
                {
                    promotions = promotions.Where(x => x.Tags.Any(x => x.Name == Constants.PromotionTags.Christmas));
                }
                else
                {
                    promotions = promotions.Where(x => x.Tags.Any(x => x.Name == Constants.PromotionTags.HolidaySeasonToneUp));
                }

                return new()
                {
                    Promotions = await promotions.Select(x => x.ToDto()).ToListAsync()
                };
            }

        }
    }
}
