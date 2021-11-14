using AngularCaching.Api.Models;

namespace AngularCaching.Api.Features
{
    public static class ToDoExtensions
    {
        public static ToDoDto ToDto(this ToDo toDo)
        {
            return new()
            {
                ToDoId = toDo.ToDoId,
                ProjectName = toDo.ProjectName,
                Description = toDo.Description,
                Status = toDo.Status
            };
        }
    }
}
