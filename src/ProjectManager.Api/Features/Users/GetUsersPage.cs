using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using ProjectManager.Api.Extensions;
using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using ProjectManager.Api.Extensions;
using Microsoft.EntityFrameworkCore;


namespace ProjectManager.Api.Features;

 public class GetUsersPageRequest : IRequest<GetUsersPageResponse>
 {
     public int PageSize { get; set; }
     public int Index { get; set; }
 }

 public class GetUsersPageResponse : ResponseBase
 {
     public int Length { get; set; }
     public List<UserDto> Entities { get; set; }
 }

 public class GetUsersPageHandler : IRequestHandler<GetUsersPageRequest, GetUsersPageResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public GetUsersPageHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<GetUsersPageResponse> Handle(GetUsersPageRequest request, CancellationToken cancellationToken)
     {
         var query = from user in _context.Users
                     select user;

         var length = await _context.Users.CountAsync();

         var users = await query.Page(request.Index, request.PageSize)
             .Select(x => x.ToDto()).ToListAsync();

         return new()
         {
             Length = length,
             Entities = users
         };
     }

 }
