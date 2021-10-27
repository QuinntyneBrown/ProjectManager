using AngularCaching.Api.Core;
using System;

namespace AngularCaching.Api.DomainEvents
{
    public class CreateToDo : BaseDomainEvent {
        public Guid ToDoId { get; private set; } = Guid.NewGuid();        
        public string Description { get; private set; }
        

        public CreateToDo(string description)
        {
            Description = description;
        }
    }

    public class UpdateToDo : BaseDomainEvent {
        public Guid ToDoId { get; private set; } = Guid.NewGuid();
        public string Status { get; private set; }
        public string Description { get; private set; }
        public UpdateToDo(string description, string status)
        {            
            Description = description;
            Status = status;
        }
    }

    public class DeleteToDo : BaseDomainEvent { }
}
