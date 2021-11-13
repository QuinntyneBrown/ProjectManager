using AngularCaching.Api.Models;

namespace AngularCaching.Api.Features
{
    public static class UserExtensions
    {
        public static UserDto ToDto(this User user)
        {
            return new()
            {
                UserId = user.UserId,
                Name = user.Username,
                CurrentProjectName = user.CurrentProjectName
            };
        }

    }
}
