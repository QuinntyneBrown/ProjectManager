using ProjectManager.Api.DomainEvents;
using ProjectManager.Api.Interfaces;
using System;
using System.Threading.Tasks;

namespace ProjectManager.Api.Features.Users
{
    public static class OrchestrationHandlerExtensions
    {
        public static Task PublishBuildTokenEvent(this IOrchestrationHandler orchestrationHandler, string username)
            => orchestrationHandler.Publish(new BuildToken(username));

        public static Task PublishBuiltTokenEvent(this IOrchestrationHandler orchestrationHandler, Guid userId, string accessToken)
            => orchestrationHandler.Publish(new BuiltToken(userId, accessToken));
    }
}
