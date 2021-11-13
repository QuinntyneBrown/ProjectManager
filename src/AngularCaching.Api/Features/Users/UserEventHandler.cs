using AngularCaching.Api.Core;
using AngularCaching.Api.DomainEvents;
using AngularCaching.Api.Interfaces;
using AngularCaching.Api.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using AngularCaching.Api.Features.Users;


namespace AngularCaching.Api.Features
{
    using Messages = AngularCaching.Api.DomainEvents;

    public class UserEventHandler :
        INotificationHandler<Messages.CreateUser>,
        INotificationHandler<BuildToken>
    {
        private readonly IAngularCachingDbContext _context;
        private readonly IOrchestrationHandler _orchestrationHandler;
        private readonly IPasswordHasher _passwordHasher;
        private readonly ITokenBuilder _tokenBuilder;

        public UserEventHandler(IAngularCachingDbContext context, IOrchestrationHandler messageHandlerContext, IPasswordHasher passwordHasher, ITokenBuilder tokenBuilder)
        {
            _context = context;
            _orchestrationHandler = messageHandlerContext;
            _passwordHasher = passwordHasher;
            _tokenBuilder = tokenBuilder;
        }



        public async Task Handle(Messages.CreateUser notification, CancellationToken cancellationToken)
        {
            var user = new User(new DomainEvents.CreateUser(
                notification.CurrentProjectName,
                notification.Username,
                notification.Password,
                _passwordHasher));


            _context.Users.Add(user);

            await _context.SaveChangesAsync(cancellationToken);

            await _orchestrationHandler.Publish(new CreatedUser(user.UserId));
        }

        public async Task Handle(BuildToken notification, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .SingleAsync(x => x.Username == notification.Username);

            _tokenBuilder
                .AddUsername(user.Username)
                .AddClaim(new System.Security.Claims.Claim(Constants.ClaimTypes.UserId, $"{user.UserId}"))
                .AddClaim(new System.Security.Claims.Claim(Constants.ClaimTypes.Username, $"{user.Username}"));

            await _orchestrationHandler.PublishBuiltTokenEvent(user.UserId, _tokenBuilder.Build());
        }
    }
}
