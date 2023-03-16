using ProjectManager.Api.Core;
using ProjectManager.Api.DomainEvents;
using System;
using System.Collections.Generic;
using System.Linq;


namespace ProjectManager.Api.Models;

public class Promotion : AggregateRoot
{
    public Guid PromotionId { get; private set; }
    public string Name { get; private set; }
    public List<PromotionTag> Tags { get; private set; }

    public Promotion(CreatePromotion @event)
    {
        Apply(@event);
    }

    private Promotion() { }

    protected override void EnsureValidState() { }

    protected override void When(dynamic @event) => When(@event);

    private void When(CreatePromotion @event)
    {
        PromotionId = @event.PromotionId;
        Name = @event.Name;
        Tags = new();
    }

    private void When(AddPromotionTag @event)
    {
        if (Tags.SingleOrDefault(x => x.Name == @event.Tag) == null)
            Tags.Add(new(@event.Tag));
    }
}
