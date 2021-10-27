using MediatR;
using System;
using System.Collections.Generic;

namespace AngularCaching.Api.Interfaces
{
    public interface IEvent : INotification
    {
        DateTime Created { get; }
        Guid CorrelationId { get; }
        Dictionary<string, object> Items { get; }
    }
}
