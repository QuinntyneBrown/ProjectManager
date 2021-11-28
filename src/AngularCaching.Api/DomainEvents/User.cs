using ProjectManager.Api.Core;
using ProjectManager.Api.Models;
using System;
using System.Security.Cryptography;

namespace ProjectManager.Api.DomainEvents
{
    public class CreateUser : BaseDomainEvent
    {
        public Guid UserId { get; private set; } = Guid.NewGuid();
        public string Username { get; private set; }
        public string Password { get; private set; }
        public byte[] Salt { get; private set; }
        public string CurrentProjectName { get; private set; }

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

    public class BuildToken : BaseDomainEvent
    {
        public BuildToken(string username)
        {
            Username = username;
        }
        public string Username { get; private set; }
    }

    public class BuiltToken : BaseDomainEvent
    {
        public BuiltToken(Guid userId, string accessToken)
        {
            UserId = userId;
            AccessToken = accessToken;
        }
        public Guid UserId { get; private set; }
        public string AccessToken { get; private set; }

        public void Deconstruct(out Guid userId, out string accessToken)
        {
            userId = UserId;
            accessToken = AccessToken;
        }
    }

    public class AuthenticatedUser : BaseDomainEvent
    {
        public AuthenticatedUser(string username)
        {
            Username = username;
        }
        public string Username { get; private set; }
    }

    public class CreatedUser : BaseDomainEvent
    {
        public Guid UserId { get; private set; }

        public CreatedUser(Guid userId)
        {
            UserId = userId;
        }
    }

    public class QueryCurrentUser : BaseDomainEvent
    {

    }

    public class QueriedCurrentUser : BaseDomainEvent
    {
        public User User { get; set; }
    }

}
