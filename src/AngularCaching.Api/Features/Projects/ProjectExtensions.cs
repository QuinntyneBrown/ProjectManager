using ProjectManager.Api.Models;

namespace ProjectManager.Api.Features
{
    public static class ProjectExtensions
    {
        public static ProjectDto ToDto(this Project project)
        {
            return new()
            {
                ProjectId = project.ProjectId,
                Name = project.Name,
                DueDate = project.DueDate
            };
        }

    }
}
