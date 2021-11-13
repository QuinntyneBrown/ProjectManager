using AngularCaching.Api.Models;

namespace AngularCaching.Api.Features
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
