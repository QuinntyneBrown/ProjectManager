using System;
using AngularCaching.Api.Models;

namespace AngularCaching.Api.Features
{
    public static class DashboardExtensions
    {
        public static DashboardDto ToDto(this Dashboard dashboard)
        {
            return new ()
            {
                DashboardId = dashboard.DashboardId
            };
        }
        
    }
}
