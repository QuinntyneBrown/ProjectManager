using AngularCaching.Api.Core;
using System;

namespace AngularCaching.Api.DomainEvents
{
    public class CreateProject : BaseDomainEvent
    {
        public Guid ProjectId { get; private set; } = Guid.NewGuid();
        public string Name { get; private set; }

        public CreateProject(string name)
        {
            Name = name;
        }
    }

}
