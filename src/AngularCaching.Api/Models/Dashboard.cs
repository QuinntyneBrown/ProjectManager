using System;

namespace ProjectManager.Api.Models
{
    public class Dashboard
    {
        public Guid DashboardId { get; private set; }
        public string Name { get; private set; }
        public string Username { get; private set; }
        public Dashboard(string name, string username)
        {
            Name = name;
            Username = username;
        }

        private Dashboard()
        {

        }
    }
}
