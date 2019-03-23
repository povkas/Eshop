using Eshop.Models;
using Microsoft.EntityFrameworkCore;


namespace Eshop.Data
{
    public class Context : DbContext
    {      
        public Context(DbContextOptions options) : base(options)
        {
        }
     
        public DbSet<User> Users { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<Product> Products { get; set; }
    }
}