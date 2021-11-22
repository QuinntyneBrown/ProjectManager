using AngularCaching.Api.Models;

namespace AngularCaching.Api.Features
{
    public static class StoredEventExtensions
    {
        public static StoredEventDto ToDto(this StoredEvent storedEvent)
        {
            return new StoredEventDto
            {
                StoredEventId = storedEvent.StoredEventId,
                StreamId = storedEvent.StreamId,
                Type = storedEvent.Type,
                Aggregate = storedEvent.Aggregate,
                AggregateDotNetType = storedEvent.AggregateDotNetType,
                Sequence = storedEvent.Sequence,
                Data = storedEvent.Data,
                DotNetType = storedEvent.DotNetType,
                CreatedOn = $"{storedEvent.CreatedOn}",
                Version = storedEvent.Version,
                CorrelationId = storedEvent.CorrelationId
            };
        }
    }
}
