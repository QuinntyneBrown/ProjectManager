using ProjectManager.Api.Models;

namespace ProjectManager.Api.Features
{
    public static class DashboardCardExtensions
    {
        public static DashboardCardDto ToDto(this DashboardCard dashboardCard)
        {
            return new()
            {
                DashboardCardId = dashboardCard.DashboardCardId,
                CardType = dashboardCard.CardType,
                Settings = dashboardCard.Settings
            };
        }
    }
}
