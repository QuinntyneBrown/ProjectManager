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

 public class GetToDosPageRequest : IRequest<GetToDosPageResponse>
 {
     public int PageSize { get; set; }
     public int Index { get; set; }
 }

 public class GetToDosPageResponse : ResponseBase
 {
     public int Length { get; set; }
     public List<ToDoDto> Entities { get; set; }
 }

 public class GetToDosPageHandler : IRequestHandler<GetToDosPageRequest, GetToDosPageResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public GetToDosPageHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<GetToDosPageResponse> Handle(GetToDosPageRequest request, CancellationToken cancellationToken)
     {
         var query = from toDo in _context.ToDos
                     select toDo;

         var length = await _context.ToDos.CountAsync();

         var toDos = await query.Page(request.Index, request.PageSize)
             .Select(x => x.ToDto()).ToListAsync();

         return new()
         {
             Length = length,
             Entities = toDos
         };
     }

 }
