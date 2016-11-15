using BaoDatShop.Data.Infrastructure;
using BaoDatShop.Model.Models;

namespace BaoDatShop.Data.Repositories
{
    public interface IProductRepository
    {
    }

    public class ProductRepository : RepositoryBase<Product>, IProductRepository
    {
        public ProductRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}