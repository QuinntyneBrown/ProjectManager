using AngularCaching.Api.Core;
using System;
using System.Security.Cryptography;

namespace AngularCaching.Api.DomainEvents
{
    public class CreateUser : BaseDomainEvent
    {
        public Guid UserId { get; private set; } = Guid.NewGuid();
        public string Username { get; private set; }
        public string Password { get; private set; }
        public byte[] Salt { get; private set; }
        public string CurrentProjectName { get; set; }

        public CreateUser(string projectName, string username, string password, IPasswordHasher passwordHasher)
        {
            CurrentProjectName = projectName;

            Salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(Salt);
            }
            Username = username;
            Password = passwordHasher.HashPassword(Salt, password);
        }
    }

    public class SetCurrentProjectName : BaseDomainEvent
    {
        public string ProjectName { get; set; }

        public SetCurrentProjectName(string projectName)
        {
            ProjectName = projectName;
        }
    }

}
