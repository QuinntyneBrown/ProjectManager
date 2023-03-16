using ProjectManager.Api.Core;
using ProjectManager.Api.DomainEvents;
using System;


namespace ProjectManager.Api.Models;

public class User : AggregateRoot
{
    public Guid UserId { get; private set; }
    public string Username { get; private set; }
    public string Password { get; private set; }
    public byte[] Salt { get; private set; }
    public string CurrentProjectName { get; private set; }

    public User(CreateUser @event)
    {
        Apply(@event);
    }

    private User() { }

    protected override void EnsureValidState() { }
    protected override void When(dynamic @event) => When(@event);
    private void When(CreateUser @event)
    {
        UserId = @event.UserId;
        Username = @event.Username;
        Password = @event.Password;
        CurrentProjectName = @event.CurrentProjectName;
        Salt = @event.Salt;
    }

    private void When(SetCurrentProjectName @event)
    {
        CurrentProjectName = @event.ProjectName;
    }
}
