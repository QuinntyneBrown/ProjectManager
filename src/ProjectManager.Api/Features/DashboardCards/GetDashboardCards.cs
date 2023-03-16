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

 public class GetDashboardCardsRequest : IRequest<GetDashboardCardsResponse> { }

 public class GetDashboardCardsResponse : ResponseBase
 {
     public List<DashboardCardDto> DashboardCards { get; set; }
 }

 public class GetDashboardCardsHandler : IRequestHandler<GetDashboardCardsRequest, GetDashboardCardsResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public GetDashboardCardsHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<GetDashboardCardsResponse> Handle(GetDashboardCardsRequest request, CancellationToken cancellationToken)
     {
         return new()
         {
             DashboardCards = await _context.DashboardCards.Select(x => x.ToDto()).ToListAsync()
         };
     }

 }
