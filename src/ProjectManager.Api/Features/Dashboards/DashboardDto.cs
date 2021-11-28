using System;

namespace ProjectManager.Api.Features
{
    public class DashboardDto
    {
        public Guid DashboardId { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
    }
}
