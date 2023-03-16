using ProjectManager.Api.Core;
using ProjectManager.Api.DomainEvents;
using System;


namespace ProjectManager.Api.Models;

public class ToDo : AggregateRoot
{
    public Guid ToDoId { get; private set; }
    public string ProjectName { get; private set; }
    public string Description { get; private set; }
    public string Status { get; private set; }
    public bool IsDeleted { get; set; }

    public ToDo(CreateToDo @event)
    {
        Apply(@event);
    }

    private ToDo() { }

    protected override void EnsureValidState()
    {
        if (string.IsNullOrEmpty(Description) || string.IsNullOrEmpty(Status) || string.IsNullOrEmpty(ProjectName))
        {
            throw new Exception();
        }
    }

    protected override void When(dynamic @event) => When(@event);

    private void When(CreateToDo @event)
    {
        ToDoId = @event.ToDoId;
        ProjectName = @event.ProjectName;
        Description = @event.Description;
        Status = "New";
    }

    private void When(UpdateToDo @event)
    {
        Description = @event.Description;
        Status = @event.Status;
    }

    private void When(DeleteToDo _) => IsDeleted = true;
}
