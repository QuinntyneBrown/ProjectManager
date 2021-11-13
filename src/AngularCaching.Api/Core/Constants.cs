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
    }
}
