using Eshop.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Eshop.Data.Repositories
{
    public class ProductsRepository : RepositoryBase<Product>
    {
        protected override DbSet<Product> ItemSet { get; }

        public ProductsRepository(Context context) : base(context)
        {
            ItemSet = context.Products;
        }

        protected override IQueryable<Product> IncludeDependencies(IQueryable<Product> queryable)
        {
            return queryable;
        }
    }
}