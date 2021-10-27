using AngularCaching.Api.Core;
using AngularCaching.Api.DomainEvents;
using System;

namespace AngularCaching.Api.Models
{
    public class ToDo: AggregateRoot
    {
        public Guid ToDoId { get; private set; }
        public string Description { get; private set; }
        public string Status { get; private set; }
        public bool IsDeleted { get; set; }

        public ToDo(CreateToDo @event)
        {
            Apply(@event);
        }

        private ToDo()
        {

        }

        protected override void EnsureValidState()
        {
            if(string.IsNullOrEmpty(Description) || string.IsNullOrEmpty(Status))
            {
                throw new Exception();
            }
        }

        protected override void When(dynamic @event) => When(@event);

        private void When(CreateToDo @event)
        {
            ToDoId = @event.ToDoId;
            Description = @event.Description;
            Status = "New";
        }

        private void When(UpdateToDo @event)
        {
            Description = @event.Description;
            Status = @event.Status;
        }

        private void When(DeleteToDo @event)
        {
            IsDeleted = true;
        }
    }
}
