using ProjectManager.Api.Models;
using Innofactor.EfCoreJsonValueConverter;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace ProjectManager.Api.Data.EntityConfigurations;

public class DashboardCardConfiguration : IEntityTypeConfiguration<DashboardCard>
{
    public void Configure(EntityTypeBuilder<DashboardCard> builder)
    {
        builder.Property(e => e.Settings).HasJsonValueConversion();
    }
}
