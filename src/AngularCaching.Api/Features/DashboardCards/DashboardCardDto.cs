using Newtonsoft.Json.Linq;
using System;

namespace AngularCaching.Api.Features
{
    public class DashboardCardDto
    {
        public Guid? DashboardCardId { get; set; }
        public string Dashboard { get; set; }
        public string CardType { get; set; }
        public JObject Settings { get; set; }
    }
}
