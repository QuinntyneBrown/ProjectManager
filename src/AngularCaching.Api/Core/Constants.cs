using System.Collections.Generic;

namespace AngularCaching.Api.Core
{
    public static class Constants
    {
        public static class ClaimTypes
        {
            public const string UserId = nameof(UserId);
            public const string Username = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
            public const string Privilege = nameof(Privilege);
            public const string Role = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
        }

        public static class PromotionTags
        {
            public const string Christmas = nameof(Christmas);
            public const string HolidaySeasonToneUp = nameof(HolidaySeasonToneUp);
            public const string Efficient = nameof(Efficient);
            public const string InEfficient = nameof(InEfficient);
            public const string TenDaysAwayFromProjectCompletion = nameof(TenDaysAwayFromProjectCompletion);
            public const string GettingStarted = nameof(GettingStarted);
            public const string Nike = nameof(Nike);
            public static List<string> All = new()
            {
                Christmas,
                Efficient,
                InEfficient,
                TenDaysAwayFromProjectCompletion,
                GettingStarted,
                HolidaySeasonToneUp,
                Nike
            };
        }

        public static class Projects
        {
            public const string ChristmasShopping = "Christmas Shopping";
            public const string HolidaySeasonToneUp = "Holiday Season Tone Up";

            public static List<string> All = new()
            {
                ChristmasShopping,
                HolidaySeasonToneUp
            };
        }

    }
}
