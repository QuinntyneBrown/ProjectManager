using AngularCaching.Api.Models;

namespace AngularCaching.Api.Data
{
    public static class SeedData
    {
        public static void Seed(AngularCachingDbContext context)
        {
            context.AddRange(
                new ToDo(new("Do Groceries")),
                new ToDo(new("Take kids to School")),
                new ToDo(new("Christmas Shopping")),
                new ToDo(new("Pay Cable Bill")),
                new ToDo(new("Register kids for Soccer Lessions")),
                new ToDo(new("Change Diapers")),
                new ToDo(new("Prepare for Work Meeting"))
                );

            context.SaveChanges();
        }
    }
}
