using System;


namespace ProjectManager.Api.Features;

public class UserDto
{
    public Guid UserId { get; set; }
    public string Name { get; set; }
    public string CurrentProjectName { get; set; }
}
