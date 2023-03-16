using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace ProjectManager.Api.Features;

 public class GetUserByIdRequest : IRequest<GetUserByIdResponse>
 {
     public Guid UserId { get; set; }
 }

 public class GetUserByIdResponse : ResponseBase
 {
     public UserDto User { get; set; }
 }

 public class GetUserByIdHandler : IRequestHandler<GetUserByIdRequest, GetUserByIdResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public GetUserByIdHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<GetUserByIdResponse> Handle(GetUserByIdRequest request, CancellationToken cancellationToken)
     {
         return new()
         {
             User = (await _context.Users.SingleOrDefaultAsync(x => x.UserId == request.UserId)).ToDto()
         };
     }

 }
