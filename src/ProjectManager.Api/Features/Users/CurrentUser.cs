using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using ProjectManager.Api.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;


namespace ProjectManager.Api.Features;

 public class CurrentUserRequest : IRequest<CurrentUserResponse> { }

 public class CurrentUserResponse
 {
     public UserDto User { get; set; }
 }

 public class CurrentUserHandler : IRequestHandler<CurrentUserRequest, CurrentUserResponse>
 {
     private readonly IProjectManagerDbContext _context;
     private readonly IHttpContextAccessor _httpContextAccessor;

     public CurrentUserHandler(IProjectManagerDbContext context, IHttpContextAccessor httpContextAccessor)
     {
         _context = context;
         _httpContextAccessor = httpContextAccessor;
     }

     public async Task<CurrentUserResponse> Handle(CurrentUserRequest request, CancellationToken cancellationToken)
     {

         if (!_httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
         {
             return new();
         }

         var userId = new Guid(_httpContextAccessor.HttpContext.User.FindFirst(Constants.ClaimTypes.UserId).Value);

         User user = _context.Users
             .Single(x => x.UserId == userId);

         return new()
         {
             User = user.ToDto()
         };
     }
 }
