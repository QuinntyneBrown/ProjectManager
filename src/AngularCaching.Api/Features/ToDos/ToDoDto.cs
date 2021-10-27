using System;

namespace AngularCaching.Api.Features
{
    public class ToDoDto
    {
        public Guid? ToDoId { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
    }
}
