using AngularCaching.Api.Core;
using AngularCaching.Api.Interfaces;
using AngularCaching.Api.Models;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace AngularCaching.Api.Features
{
    public class CreatePromotion
    {
        public class Validator : AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(request => request.Promotion).NotNull();
                RuleFor(request => request.Promotion).SetValidator(new PromotionValidator());
            }

        }

        public class Request : IRequest<Response>
        {
            public PromotionDto Promotion { get; set; }
        }

        public class Response : ResponseBase
        {
            public PromotionDto Promotion { get; set; }
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IAngularCachingDbContext _context;

            public Handler(IAngularCachingDbContext context)
                => _context = context;

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var promotion = new Promotion(new(request.Promotion.Name));

                _context.Promotions.Add(promotion);

                await _context.SaveChangesAsync(cancellationToken);

                return new Response()
                {
                    Promotion = promotion.ToDto()
                };
            }

        }
    }
}
