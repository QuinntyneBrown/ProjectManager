using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System;
using ProjectManager.Api.Models;
using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;


namespace ProjectManager.Api.Features;

public class RemovePromotion
{
    public class Request : IRequest<Response>
    {
        public Guid PromotionId { get; set; }
    }

    public class Response : ResponseBase
    {
        public PromotionDto Promotion { get; set; }
    }

    public class Handler : IRequestHandler<Request, Response>
    {
        private readonly IProjectManagerDbContext _context;

        public Handler(IProjectManagerDbContext context)
            => _context = context;

        public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
        {
            var promotion = await _context.Promotions.SingleAsync(x => x.PromotionId == request.PromotionId);

            _context.Promotions.Remove(promotion);

            await _context.SaveChangesAsync(cancellationToken);

            return new Response()
            {
                Promotion = promotion.ToDto()
            };
        }

    }
}
