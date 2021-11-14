using AngularCaching.Api.Core;
using AngularCaching.Api.DomainEvents;
using AngularCaching.Api.Models;
using System;
using System.Collections.Generic;

namespace AngularCaching.Api.Data
{
    public static class SeedData
    {


        public static void Seed(AngularCachingDbContext context)
        {

            context.AddRange(
                new Project(new(Constants.Projects.ChristmasShopping, new DateTime(2021, 12, 24))),
                new Project(new(Constants.Projects.HolidaySeasonToneUp, new DateTime(2021, 12, 10)))
                );

            context.Add(new User(new(Constants.Projects.ChristmasShopping, "Quinn", "ngrx", new PasswordHasher())));

            context.AddRange(
                new ToDo(new(Constants.Projects.ChristmasShopping, "Diamond Earings for Wife")),
                new ToDo(new(Constants.Projects.ChristmasShopping, "Nike Shoes for Daughter")),
                new ToDo(new(Constants.Projects.ChristmasShopping, "Drone for Teenage Son")),
                new ToDo(new(Constants.Projects.ChristmasShopping, "Stocking Stuffers")),
                new ToDo(new(Constants.Projects.ChristmasShopping, "Batteries, batteries, batteries"))
                );

            context.AddRange(
                new ToDo(new(Constants.Projects.HolidaySeasonToneUp, "Weight Training")),
                new ToDo(new(Constants.Projects.HolidaySeasonToneUp, "Jogging")),
                new ToDo(new(Constants.Projects.HolidaySeasonToneUp, "Yoga")),
                new ToDo(new(Constants.Projects.HolidaySeasonToneUp, "Push ups")),
                new ToDo(new(Constants.Projects.HolidaySeasonToneUp, "Sit ups"))
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
                            new Promotion(new("Boxing Sale: Electronics")),
                            new Promotion(new("Christmas Tree Sale"))
                        };

                        break;

                    case Constants.PromotionTags.HolidaySeasonToneUp:
                        promotions = new()
                        {
                            new Promotion(new("Bench Press Sale")),
                            new Promotion(new("Santa Claus Shuffle Run"))
                        };

                        break;

                    case Constants.PromotionTags.Efficient:
                        promotions = new()
                        {
                            new Promotion(new("Book: How to achieve Excellence")),
                        };
                        break;

                    case Constants.PromotionTags.InEfficient:
                        promotions = new()
                        {
                            new Promotion(new("Book: Seven Habits of Highly Effective People")),
                            new Promotion(new("Book: Good to Great"))
                        };

                        break;

                    case Constants.PromotionTags.TenDaysAwayFromProjectCompletion:
                        promotions = new()
                        {
                            new Promotion(new("Dream Vacations: Jamaica")),
                        };
                        break;

                    case Constants.PromotionTags.GettingStarted:
                        promotions = new()
                        {
                            new Promotion(new("Wedding Planner")),
                            new Promotion(new("Bootcamp to complete Projects on Time")),
                        };
                        break;

                    case Constants.PromotionTags.Nike:
                        promotions = new()
                        {
                            new Promotion(new("Nike Dixie Mall Outlet Sale"))
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
