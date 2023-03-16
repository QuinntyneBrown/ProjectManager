using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace ProjectManager.Api.Features;

 public class GetDashboardCardByIdRequest : IRequest<GetDashboardCardByIdResponse>
 {
     public Guid DashboardCardId { get; set; }
 }

 public class GetDashboardCardByIdResponse : ResponseBase
 {
     public DashboardCardDto DashboardCard { get; set; }
 }

 public class GetDashboardCardByIdHandler : IRequestHandler<GetDashboardCardByIdRequest, GetDashboardCardByIdResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public GetDashboardCardByIdHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<GetDashboardCardByIdResponse> Handle(GetDashboardCardByIdRequest request, CancellationToken cancellationToken)
     {
         return new()
         {
             DashboardCard = (await _context.DashboardCards.SingleOrDefaultAsync(x => x.DashboardCardId == request.DashboardCardId)).ToDto()
         };
     }

 }
