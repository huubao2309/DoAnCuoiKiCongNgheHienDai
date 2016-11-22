using System;

namespace BaoDatShop.Data.Infrastructure
{
    public interface IDbFactory : IDisposable
    {
        BaoDatShopDbContext Init();
    }
}