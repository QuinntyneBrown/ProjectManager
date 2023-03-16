using ProjectManager.Api.Core;
using System;


namespace ProjectManager.Api.DomainEvents;

public class CreateToDo : BaseDomainEvent
{
    public Guid ToDoId { get; private set; } = Guid.NewGuid();
    public string Description { get; private set; }
    public string ProjectName { get; set; }

    public CreateToDo(string projectName, string description)
    {
        ProjectName = projectName;
        Description = description;
    }
}

public class UpdateToDo : BaseDomainEvent
{
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
