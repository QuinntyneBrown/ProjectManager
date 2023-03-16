using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace ProjectManager.Api.Features;

 public class GetUsersRequest : IRequest<GetUsersResponse> { }

 public class GetUsersResponse : ResponseBase
 {
     public List<UserDto> Users { get; set; }
 }

 public class GetUsersHandler : IRequestHandler<GetUsersRequest, GetUsersResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public GetUsersHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<GetUsersResponse> Handle(GetUsersRequest request, CancellationToken cancellationToken)
     {
         return new()
         {
             Users = await _context.Users.Select(x => x.ToDto()).ToListAsync()
         };
     }

 }
