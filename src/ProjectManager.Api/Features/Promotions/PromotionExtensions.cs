using ProjectManager.Api.Models;

namespace ProjectManager.Api.Features
{
    public static class PromotionExtensions
    {
        public static PromotionDto ToDto(this Promotion promotion)
        {
            return new()
            {
                PromotionId = promotion.PromotionId,
                Name = promotion.Name
            };
        }

    }
}
