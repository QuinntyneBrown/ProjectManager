using AngularCaching.Api.Core;
using AngularCaching.Api.DomainEvents;
using AngularCaching.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AngularCaching.Api.Data
{
    public static class SeedData
    {
        public static void Seed(AngularCachingDbContext context)
        {

            context.AddRange(
                new Project(new("Christmas Shopping", new DateTime(2021, 12, 24))),
                new Project(new("Holiday Season Tone Up", new DateTime(2021, 12, 10)))
                );

            context.SaveChanges();

            context.Add(new User(new(context.Projects.First().Name, "Quinn", "ngrx", new PasswordHasher())));

            context.ToDos.AddRange(
                new(new(context.Projects.First().Name, "Diamond Earings for Wife")),
                new(new(context.Projects.First().Name, "Nike Shoes for Daughter")),
                new(new(context.Projects.First().Name, "Drone for Teenage Son")),
                new(new(context.Projects.First().Name, "Stocking Stuffers")),
                new(new(context.Projects.First().Name, "Batteries, batteries, batteries")),
                new(new(context.Projects.AsEnumerable().ElementAt(1).Name, "Weight Training")),
                new(new(context.Projects.AsEnumerable().ElementAt(1).Name, "Jogging")),
                new(new(context.Projects.AsEnumerable().ElementAt(1).Name, "Yoga")),
                new(new(context.Projects.AsEnumerable().ElementAt(1).Name, "Push ups")),
                new(new(context.Projects.AsEnumerable().ElementAt(1).Name, "Sit ups"))
                );

            context.SaveChanges();

            List<Promotion> promotions = null;

            foreach (var promotionTag in Constants.PromotionTags.All)
            {
                switch (promotionTag)
                {
                    case Constants.PromotionTags.Christmas:
                        promotions = new()
                        {
                            new(new("Boxing Sale: Electronics")),
                            new(new("Christmas Tree Sale"))
                        };

                        break;

                    case Constants.PromotionTags.HolidaySeasonToneUp:
                        promotions = new()
                        {
                            new(new("Bench Press Sale")),
                            new(new("Santa Claus Shuffle Run"))
                        };

                        break;

                    case Constants.PromotionTags.Efficient:
                        promotions = new()
                        {
                            new(new("Book: How to achieve Excellence")),
                        };
                        break;

                    case Constants.PromotionTags.InEfficient:
                        promotions = new()
                        {
                            new(new("Book: Seven Habits of Highly Effective People")),
                            new(new("Book: Good to Great"))
                        };

                        break;

                    case Constants.PromotionTags.TenDaysAwayFromProjectCompletion:
                        promotions = new()
                        {
                            new(new("Dream Vacations: Jamaica")),
                        };
                        break;

                    case Constants.PromotionTags.GettingStarted:
                        promotions = new()
                        {
                            new(new("Wedding Planner")),
                            new(new("Bootcamp to complete Projects on Time")),
                        };
                        break;

                    case Constants.PromotionTags.Nike:
                        promotions = new()
                        {
                            new(new("Nike Dixie Mall Outlet Sale"))
                        };
                        break;
                }

                foreach (var promotion in promotions)
                {
                    promotion.Apply(new AddPromotionTag(promotionTag));
                    context.Add(promotion);
                }

                context.SaveChanges();
            }
        }
    }
}
