using AngularCaching.Api.Core;
using AngularCaching.Api.DomainEvents;
using System;

namespace AngularCaching.Api.Models
{
    public class Project : AggregateRoot
    {
        public Guid ProjectId { get; private set; }
        public string Name { get; private set; }
        public DateTime DueDate { get; private set; }

        public Project(CreateProject @event)
        {
            Apply(@event);
        }

        private Project()
        {

        }

        protected override void EnsureValidState() { }

        protected override void When(dynamic @event) => When(@event);

        private void When(CreateProject @event)
        {
            ProjectId = @event.ProjectId;
            Name = @event.Name;
            DueDate = @event.DueDate;
        }
    }
}
