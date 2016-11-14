namespace BaoDatShop.Data.Infrastructure
{
    public class DbFactory : Disposable, IDbFactory
    {
        private BaoDatShopDbContext dbContext;

        public BaoDatShopDbContext Init()
        {
            return dbContext ?? (dbContext = new BaoDatShopDbContext());
        }

        protected override void DisposeCore()
        {
            if (dbContext != null)
                dbContext.Dispose();
        }
    }
}