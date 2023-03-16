using System;


namespace ProjectManager.Api.Features;

public class ToDoDto
{
    public Guid? ToDoId { get; set; }
    public string ProjectName { get; set; }
    public string Description { get; set; }
    public string Status { get; set; }
}
