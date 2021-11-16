using AngularCaching.Api.Core;
using AngularCaching.Api.Interfaces;
using AngularCaching.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace AngularCaching.Api.Data
{
    public class AngularCachingDbContext : DbContext, IAngularCachingDbContext
    {
        public DbSet<ToDo> ToDos { get; private set; }
        public DbSet<StoredEvent> StoredEvents { get; private set; }
        public DbSet<Project> Projects { get; private set; }
        public DbSet<User> Users { get; private set; }
        public DbSet<Promotion> Promotions { get; private set; }
        public DbSet<DashboardCard> DashboardCards { get; private set; }
        public DbSet<Dashboard> Dashboards { get; private set; }
        public AngularCachingDbContext(DbContextOptions options)
            : base(options)
        {
            SavingChanges += DbContext_SavingChanges;
        }

        private void DbContext_SavingChanges(object sender, SavingChangesEventArgs e)
        {
            var entries = ChangeTracker.Entries<AggregateRoot>()
                .Where(
                    e => e.State == EntityState.Added ||
                    e.State == EntityState.Modified)
                .Select(e => e.Entity)
                .ToList();

            foreach (var aggregate in entries)
            {
                foreach (var storedEvent in aggregate.StoredEvents)
                {
                    StoredEvents.Add(storedEvent);
                }
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AngularCachingDbContext).Assembly);
        }

        public override void Dispose()
        {
            SavingChanges -= DbContext_SavingChanges;

            base.Dispose();
        }

        public override ValueTask DisposeAsync()
        {
            SavingChanges -= DbContext_SavingChanges;

            return base.DisposeAsync();
        }

    }
}
