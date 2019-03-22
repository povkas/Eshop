using System;
using Eshop.Models;
using System.Collections.Generic;
using System.Linq;

namespace Eshop.Data
{
    public class SeedData
    {
        public static void Seed(Context context)
        {
            if (context.Users.Any() && context.Products.Any() && context.ProductCategories.Any())
                return;

            var users = new List<User>
            {
                 new User{Name = "Alechandro", Surname = "Barbosa", Email = "sexy@gmail.com", Country = "USA", City = "Siaule",
                     Address = "Address", Password= "sexius", ConfirmPassword = "sexius"}
            };

            users.ForEach(t => context.Users.Add(t));
            context.SaveChanges();

            var products = new List<Product>
            {
                new Product{Title = "Shovel", Description = "Firm stainless steel frame", Price = 15, Quantity = 1, Created = DateTime.Now }
            };
            products.ForEach(t => context.Products.Add(t));

            var productCategories = new List<ProductCategory>
            {
                new ProductCategory(){Category = "Electronics"},
                new ProductCategory(){Category = "Sports"},
                new ProductCategory(){Category = "Fashion"},
                new ProductCategory(){Category = "Books"},
                new ProductCategory(){Category = "Video Games"},
                new ProductCategory(){Category = "Health"},
                new ProductCategory(){Category = "Movies & TV"}
            };

            productCategories.ForEach(t => context.ProductCategories.Add(t));

            context.SaveChanges();

        }
    }
}