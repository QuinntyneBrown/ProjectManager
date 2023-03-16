using ProjectManager.Api.Core;
using ProjectManager.Api.Interfaces;
using ProjectManager.Api.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;


namespace ProjectManager.Api.Features;

 public class GetPromotionsByProjectRequest : IRequest<GetPromotionsByProjectResponse>
 {
     public Guid ProjectId { get; set; }
 }

 public class GetPromotionsByProjectResponse : ResponseBase
 {
     public List<PromotionDto> Promotions { get; set; }
 }

 public class GetPromotionsByProjectHandler : IRequestHandler<GetPromotionsByProjectRequest, GetPromotionsByProjectResponse>
 {
     private readonly IProjectManagerDbContext _context;

     public GetPromotionsByProjectHandler(IProjectManagerDbContext context)
         => _context = context;

     public async Task<GetPromotionsByProjectResponse> Handle(GetPromotionsByProjectRequest request, CancellationToken cancellationToken)
     {
         var project = await _context.Projects.SingleOrDefaultAsync(x => x.ProjectId == request.ProjectId);

         var todos = await (from toDo in _context.ToDos
                            where toDo.ProjectName == project.Name
                            select toDo).ToListAsync();

         var promotions = new HashSet<Promotion>();

         if (project.Name == Constants.Projects.ChristmasShopping)
         {
             foreach (var p in _context.Promotions.Where(x => x.Tags.Any(x => x.Name == Constants.PromotionTags.Christmas)))
             {
                 promotions.Add(p);
             }
         }
         else
         {
             foreach (var p in _context.Promotions.Where(x => x.Tags.Any(x => x.Name == Constants.PromotionTags.HolidaySeasonToneUp)))
             {
                 promotions.Add(p);
             }
         }

         if (todos.Where(x => x.Status == "Complete").Count() == 0)
         {
             foreach (var p in _context.Promotions.Where(x => x.Tags.Any(x => x.Name == Constants.PromotionTags.GettingStarted)))
             {
                 promotions.Add(p);
             }
         }

         if (todos.Where(x => x.Status == "Complete").Count() == todos.Count())
         {
             foreach (var p in _context.Promotions.Where(x => x.Tags.Any(x => x.Name == Constants.PromotionTags.Efficient)))
             {
                 promotions.Add(p);
             }
         }


         if (todos.SingleOrDefault(x => x.Status != "Complete" && x.Description.Contains("Christmas")) != null)
         {
             foreach (var p in _context.Promotions.Where(x => x.Tags.Any(x => x.Name == Constants.PromotionTags.Christmas)))
             {
                 promotions.Add(p);
             }
         }

         if (todos.SingleOrDefault(x => x.Status != "Complete" && x.Description.Contains("Nike")) != null)
         {
             foreach (var p in _context.Promotions.Where(x => x.Tags.Any(x => x.Name == Constants.PromotionTags.Nike)))
             {
                 promotions.Add(p);
             }
         }

         var totalDays = (project.DueDate - DateTime.UtcNow).TotalDays;

         if (totalDays > 0 && totalDays < 10)
         {
             foreach (var p in _context.Promotions.Where(x => x.Tags.Any(x => x.Name == Constants.PromotionTags.TenDaysAwayFromProjectCompletion)))
             {
                 promotions.Add(p);
             }
         }

         return new()
         {
             Promotions = promotions.Select(x => x.ToDto()).ToList()
         };
     }

 }
