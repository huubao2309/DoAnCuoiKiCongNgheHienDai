 using BaoDatShop.Data.Infrastructure;
using BaoDatShop.Model.Models;

namespace BaoDatShop.Data.Repositories
{
    public interface ITagRepository : IRepository<Tag>
    {
    }

    public class TagRepository : RepositoryBase<Tag>, ITagRepository
    {
        public TagRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}