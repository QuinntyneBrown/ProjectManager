using AngularCaching.Api.Core;
using AngularCaching.Api.Models;
using System;

namespace AngularCaching.Api.Data
{
    public static class SeedData
    {
        public const string Project1 = "Christmas Shopping";
        public const string Project2 = "Holiday Season Tone Up";

        public static void Seed(AngularCachingDbContext context)
        {

            context.AddRange(
                new Project(new(Project1, new DateTime(2021, 12, 24))),
                new Project(new(Project2, new DateTime(2021, 12, 10)))
                );

            context.Add(new User(new(Project1, "Quinn", "ngrx", new PasswordHasher())));

            context.AddRange(
                new ToDo(new(Project1, "Diamond Earings for Wife")),
                new ToDo(new(Project1, "Nike Shoes for Daughter")),
                new ToDo(new(Project1, "Drone for Teenage Son")),
                new ToDo(new(Project1, "Stocking Stuffers")),
                new ToDo(new(Project1, "Batteries, batteries, batteries"))
                );

            context.AddRange(
                new ToDo(new(Project2, "Weight Training")),
                new ToDo(new(Project2, "Jogging")),
                new ToDo(new(Project2, "Yoga")),
                new ToDo(new(Project2, "Push ups")),
                new ToDo(new(Project2, "Sit ups"))
                );

            context.SaveChanges();
        }
    }
}
