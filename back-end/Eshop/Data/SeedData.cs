using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using Eshop.Models;
using Microsoft.EntityFrameworkCore;

namespace Eshop.Data
{
    public class SeedData
    {
        public static void Seed(Context context)
        {
           if (context.Users.Any() && context.Products.Any())
                return;
          
            var users1 = new List<User>
            {

                 new User{Name = "Alechandro", Surname = "Barbosa", Email = "user@gmail.com", Country = "USA", City = "Siaule",
                     Address = "Address", Password= "password123", ConfirmPassword = "tralala"}
            };
            var users2 = new List<User>
            {

                 new User{Name = "Alechandro", Surname = "Barbosa", Email = "admin@gmail.com", Country = "USA", City = "Siaule",
                     Address = "Address", Password= "password123", ConfirmPassword = "tralala"}
            };

            users1.ForEach(t => context.Users.Add(t));
            users2.ForEach(t => context.Users.Add(t));
            context.SaveChanges();

            var products = new List<Product>
            {
                new Product{Title = "Shovel", Description = "Firm stainless steel frame", Price = 15, Quantity = 1, Created = DateTime.Now }
            };
            products.ForEach(t => context.Products.Add(t));

            context.SaveChanges();

        }
    }
}
