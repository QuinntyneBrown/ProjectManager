using ProjectManager.Api.Core;
using System;

namespace ProjectManager.Api.DomainEvents
{
    public class CreateProject : BaseDomainEvent
    {
        public Guid ProjectId { get; private set; } = Guid.NewGuid();
        public string Name { get; private set; }
        public DateTime DueDate { get; set; }

        public CreateProject(string name, DateTime dueDate)
        {
            DueDate = dueDate;
            Name = name;
        }
    }

    public class UpdateDueDate : BaseDomainEvent
    {
        public DateTime DueDate { get; set; }

        public UpdateDueDate(DateTime dueDate)
        {
            DueDate = dueDate;
        }
    }

}
