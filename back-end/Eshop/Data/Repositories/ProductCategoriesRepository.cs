using Eshop.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Eshop.Data.Repositories
{
    public class ProductCategoriesRepository : RepositoryBase<ProductCategory>
    {
        protected override DbSet<ProductCategory> ItemSet { get; }

        public ProductCategoriesRepository(Context context) : base(context)
        {
            ItemSet = context.ProductCategories;
        }

        protected override IQueryable<ProductCategory> IncludeDependencies(IQueryable<ProductCategory> queryable)
        {
            return queryable;
        }
    }
}