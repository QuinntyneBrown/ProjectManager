using AngularCaching.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace AngularCaching.Api.Interfaces
{
    public interface IAngularCachingDbContext
    {
        DbSet<ToDo> ToDos { get; }
        DbSet<StoredEvent> StoredEvents { get; }
        DbSet<Project> Projects { get; }
        DbSet<User> Users { get; }
        DbSet<Promotion> Promotions { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);

    }
}
