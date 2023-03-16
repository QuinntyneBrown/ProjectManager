using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System;
using ProjectManager.Api.Models;
using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;


namespace ProjectManager.Api.Features;

 public class RemoveUserRequest : IRequest<RemoveUserResponse>
 {
     public Guid UserId { get; set; }
 }

 public class RemoveUserResponse : ResponseBase
 {
     public UserDto User { get; set; }
 }

 public class RemoveUserHandler : IRequestHandler<RemoveUserRequest, RemoveUserResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public RemoveUserHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<RemoveUserResponse> Handle(RemoveUserRequest request, CancellationToken cancellationToken)
     {
         var user = await _context.Users.SingleAsync(x => x.UserId == request.UserId);

         _context.Users.Remove(user);

         await _context.SaveChangesAsync(cancellationToken);

         return new RemoveUserResponse()
         {
             User = user.ToDto()
         };
     }

 }
