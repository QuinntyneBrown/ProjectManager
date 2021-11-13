using AngularCaching.Api.Core;
using AngularCaching.Api.DomainEvents;
using System;

namespace AngularCaching.Api.Models
{
    public class Promotion : AggregateRoot
    {
        public Guid PromotionId { get; set; }
        public string Name { get; set; }

        public Promotion(CreatePromotion @event)
        {
            Apply(@event);
        }

        private Promotion()
        {

        }

        protected override void EnsureValidState()
        {

        }

        protected override void When(dynamic @event) => When(@event);

        private void When(CreatePromotion @event)
        {
            PromotionId = @event.PromotionId;
            Name = @event.Name;
        }
    }
}
