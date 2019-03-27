using Eshop.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using CryptoHelper;

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
                 new User{Name = "Dave", Surname = "Smith", Email = "user@email.com", Country = "Lithuania", City = "Kaunas",
                     Address = "Studentų g. 50-201", Password = Crypto.HashPassword("user1234"), IsAdmin = false},
                new User{Name = "Dave", Surname = "Smith", Email = "admin@email.com", Country = "Lithuania", City = "Kaunas",
                    Address = "Studentų g. 50-201", Password = Crypto.HashPassword("admin1234"), IsAdmin = true}
            };

            users.ForEach(t => context.Users.Add(t));

            var productCategories = new List<ProductCategory>
            {
                new ProductCategory{Category = "Electronics"},
                new ProductCategory{Category = "Sports"},
                new ProductCategory{Category = "Fashion"},
                new ProductCategory{Category = "Books"},
                new ProductCategory{Category = "Video Games"},
                new ProductCategory{Category = "Health"},
                new ProductCategory{Category = "Gardening"},
                new ProductCategory{Category = "Movies & TV"}
            };

            productCategories.ForEach(t => context.ProductCategories.Add(t));

            FileInfo fileInfo = new FileInfo(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "Images", "shovel.jpg"));
            byte[] data = new byte[fileInfo.Length];
            using (FileStream fs = fileInfo.OpenRead())
            {
                fs.Read(data, 0, data.Length);
            }

            var products = new List<Product>
            {
                new Product
                {
                    Title = "Shovel",
                    Description = "Firm stainless steel frame",
                    Price = 15,
                    Quantity = 1,
                    Created = DateTime.Now,
                    Image = data,
                    Category = "Gardening"
                }
            };

            products.ForEach(t => context.Products.Add(t));
            context.SaveChanges();
        }
    }
}