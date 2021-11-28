using System;

namespace ProjectManager.Api.Features
{
    public class ProjectDto
    {
        public Guid ProjectId { get; set; }
        public string Name { get; set; }
        public DateTime DueDate { get; set; }
    }
}
