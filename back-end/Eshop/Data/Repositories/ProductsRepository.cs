using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Models;
using Microsoft.EntityFrameworkCore;

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
