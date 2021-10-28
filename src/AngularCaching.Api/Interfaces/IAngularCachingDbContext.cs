using AngularCaching.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Threading;

namespace AngularCaching.Api.Interfaces
{
    public interface IAngularCachingDbContext
    {
        DbSet<ToDo> ToDos { get; }
        DbSet<StoredEvent> StoredEvents { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);

    }
}
