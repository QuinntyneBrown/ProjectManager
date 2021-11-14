using AngularCaching.Api.Core;
using System;

namespace AngularCaching.Api.DomainEvents
{
    public class CreatePromotion : BaseDomainEvent
    {
        public Guid PromotionId { get; set; } = Guid.NewGuid();
        public string Name { get; set; }
        public CreatePromotion(string name)
        {
            Name = name;
        }
    }

    public class AddPromotionTag : BaseDomainEvent
    {
        public string Tag { get; private set; }
        public AddPromotionTag(string tag)
        {
            Tag = tag;
        }
    }
}
