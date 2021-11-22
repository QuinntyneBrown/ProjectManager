using System;

namespace AngularCaching.Api.Features
{
    public class StoredEventDto
    {
        public Guid StoredEventId { get; set; }
        public Guid StreamId { get; set; }
        public string Type { get; set; }
        public string Aggregate { get; set; }
        public string AggregateDotNetType { get; set; }
        public int Sequence { get; set; }
        public string Data { get; set; }
        public string DotNetType { get; set; }
        public string CreatedOn { get; set; }
        public int Version { get; set; }
        public Guid CorrelationId { get; set; }
    }
}
