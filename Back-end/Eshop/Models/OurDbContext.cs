using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.Entity;

namespace eShop_RegLog.Models
{
    public class OurDbContext : DbContext
    {
        public DbSet<UserAccount> userAcount { get; set; }

    }
}
