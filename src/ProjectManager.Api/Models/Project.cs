using ProjectManager.Api.Core;
using ProjectManager.Api.DomainEvents;
using System;


namespace ProjectManager.Api.Models;

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

    private void When(UpdateDueDate @event)
    {
        DueDate = @event.DueDate;
    }
}
