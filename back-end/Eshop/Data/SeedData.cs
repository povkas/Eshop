using Eshop.Models;
using System.Collections.Generic;
using System.Linq;
<<<<<<< HEAD
=======
using System.Net.Mime;
using System.Threading.Tasks;
using Eshop.Models;
using Microsoft.EntityFrameworkCore;
>>>>>>> master

namespace Eshop.Data
{
    public class SeedData
    {
        public static void Seed(Context context)
        {
            if (context.Users.Any() && context.Products.Any())
                return;

            var users = new List<User>
            {
                new User{Email = "admin@gmail.com", Password= "root1234", Role = "ADMIN", Address = "Address"},
                new User{Email = "user@gmail.com", Password= "root1234", Role = "NORMAL", Address = "Address"}
            };

            users.ForEach(t => context.Users.Add(t));

            var products = new List<Product>
            {
                new Product{Title= "Shovel", Description= "Firm stainless steel frame", Price = 15, Quantity = 1, Created = DateTime.Now}
            };

            products.ForEach(t => context.Products.Add(t));

            context.SaveChanges();
        }
    }
}