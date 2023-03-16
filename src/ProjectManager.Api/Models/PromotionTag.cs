using Microsoft.EntityFrameworkCore;


namespace ProjectManager.Api.Models;

[Owned]
public class PromotionTag
{
    public string Name { get; private set; }
    public PromotionTag(string name)
    {
        Name = name;
    }
}
