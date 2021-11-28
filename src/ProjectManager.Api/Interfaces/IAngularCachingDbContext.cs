using ProjectManager.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Threading;

namespace ProjectManager.Api.Interfaces
{
    public interface IProjectManagerDbContext
    {
        DbSet<ToDo> ToDos { get; }
        DbSet<StoredEvent> StoredEvents { get; }
        DbSet<Project> Projects { get; }
        DbSet<User> Users { get; }
        DbSet<Promotion> Promotions { get; }
        DbSet<DashboardCard> DashboardCards { get; }
        DbSet<Dashboard> Dashboards { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
        
    }
}
