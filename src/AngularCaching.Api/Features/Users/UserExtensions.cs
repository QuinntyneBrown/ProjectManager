using ProjectManager.Api.Models;

namespace ProjectManager.Api.Features
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
