using System;
using ProjectManager.Api.Models;


namespace ProjectManager.Api.Features;

public static class DashboardExtensions
{
    public static DashboardDto ToDto(this Dashboard dashboard)
    {
        return new()
        {
            DashboardId = dashboard.DashboardId
        };
    }

}
