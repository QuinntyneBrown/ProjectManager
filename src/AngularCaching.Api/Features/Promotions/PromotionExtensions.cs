using System;
using AngularCaching.Api.Models;

namespace AngularCaching.Api.Features
{
    public static class PromotionExtensions
    {
        public static PromotionDto ToDto(this Promotion promotion)
        {
            return new ()
            {
                PromotionId = promotion.PromotionId
            };
        }
        
    }
}
