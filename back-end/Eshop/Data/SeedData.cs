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

            FileInfo fileInfo1 = new FileInfo(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "Images", "onePlus7.jpg"));
            byte[] onePlusData = new byte[fileInfo1.Length];
            using (FileStream fs = fileInfo1.OpenRead())
            {
                fs.Read(onePlusData, 0, onePlusData.Length);
            }

            FileInfo fileInfo2 = new FileInfo(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "Images", "airpods2.jpg"));
            byte[] aipodsData = new byte[fileInfo2.Length];
            using (FileStream fs = fileInfo2.OpenRead())
            {
                fs.Read(aipodsData, 0, aipodsData.Length);
            }

            FileInfo fileInfo3 = new FileInfo(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "Images", "shovel.jpg"));
            byte[] shovelData = new byte[fileInfo3.Length];
            using (FileStream fs = fileInfo3.OpenRead())
            {
                fs.Read(shovelData, 0, shovelData.Length);
            }

            FileInfo fileInfo4 = new FileInfo(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "Images", "basketball_.jpg"));
            byte[] basketballData = new byte[fileInfo4.Length];
            using (FileStream fs = fileInfo4.OpenRead())
            {
                fs.Read(basketballData, 0, basketballData.Length);
            }

            FileInfo fileInfo5 = new FileInfo(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "Images", "football.jpg"));
            byte[] footballData = new byte[fileInfo5.Length];
            using (FileStream fs = fileInfo5.OpenRead())
            {
                fs.Read(footballData, 0, footballData.Length);
            }


            FileInfo fileInfo6 = new FileInfo(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "Images", "angel.jpg"));
            byte[] angelData = new byte[fileInfo6.Length];
            using (FileStream fs = fileInfo6.OpenRead())
            {
                fs.Read(angelData, 0, angelData.Length);
            }

            FileInfo fileInfo7 = new FileInfo(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "Images", "boss.jpg"));
            byte[] bossData = new byte[fileInfo7.Length];
            using (FileStream fs = fileInfo7.OpenRead())
            {
                fs.Read(bossData, 0, bossData.Length);
            }

            FileInfo fileInfo8 = new FileInfo(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "Images", "dell_xps15.jpg"));
            byte[] xpsData = new byte[fileInfo8.Length];
            using (FileStream fs = fileInfo8.OpenRead())
            {
                fs.Read(xpsData, 0, xpsData.Length);
            }

            FileInfo fileInfo9 = new FileInfo(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "Images", "Doom.jpg"));
            byte[] doomData = new byte[fileInfo9.Length];
            using (FileStream fs = fileInfo9.OpenRead())
            {
                fs.Read(doomData, 0, doomData.Length);
            }

            FileInfo fileInfo10 = new FileInfo(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "Images", "dove_shampoo.png"));
            byte[] doveData = new byte[fileInfo10.Length];
            using (FileStream fs = fileInfo10.OpenRead())
            {
                fs.Read(doveData, 0, doveData.Length);
            }

            FileInfo fileInfo11 = new FileInfo(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "Images", "God_of_War.jpg"));
            byte[] gowData = new byte[fileInfo11.Length];
            using (FileStream fs = fileInfo11.OpenRead())
            {
                fs.Read(gowData, 0, gowData.Length);
            }

            FileInfo fileInfo12 = new FileInfo(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "Images", "helmet.jpg"));
            byte[] helmetData = new byte[fileInfo12.Length];
            using (FileStream fs = fileInfo12.OpenRead())
            {
                fs.Read(helmetData, 0, helmetData.Length);
            }

            FileInfo fileInfo13 = new FileInfo(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "Images", "jabra.png"));
            byte[] jabraData = new byte[fileInfo13.Length];
            using (FileStream fs = fileInfo13.OpenRead())
            {
                fs.Read(jabraData, 0, jabraData.Length);
            }

            FileInfo fileInfo14 = new FileInfo(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "Images", "pan.jpg"));
            byte[] panData = new byte[fileInfo14.Length];
            using (FileStream fs = fileInfo14.OpenRead())
            {
                fs.Read(panData, 0, panData.Length);
            }

            FileInfo fileInfo15 = new FileInfo(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "Images", "sapiens.jpg"));
            byte[] sapiensData = new byte[fileInfo15.Length];
            using (FileStream fs = fileInfo15.OpenRead())
            {
                fs.Read(sapiensData, 0, sapiensData.Length);
            }

            FileInfo fileInfo16 = new FileInfo(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "Images", "scarf.jpg"));
            byte[] scarfData = new byte[fileInfo16.Length];
            using (FileStream fs = fileInfo16.OpenRead())
            {
                fs.Read(scarfData, 0, scarfData.Length);
            }

            FileInfo fileInfo17 = new FileInfo(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "Images", "selfish_gene.jpg"));
            byte[] geneData = new byte[fileInfo17.Length];
            using (FileStream fs = fileInfo17.OpenRead())
            {
                fs.Read(geneData, 0, geneData.Length);
            }

            FileInfo fileInfo18 = new FileInfo(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "Images", "toothbrush.jpg"));
            byte[] brushData = new byte[fileInfo18.Length];
            using (FileStream fs = fileInfo18.OpenRead())
            {
                fs.Read(brushData, 0, brushData.Length);
            }

            FileInfo fileInfo19 = new FileInfo(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "Images", "waking_up.jpg"));
            byte[] wakingData = new byte[fileInfo19.Length];
            using (FileStream fs = fileInfo19.OpenRead())
            {
                fs.Read(wakingData, 0, wakingData.Length);
            }

            FileInfo fileInfo20 = new FileInfo(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "Images", "turtleneck.jpg"));
            byte[] turtleneckData = new byte[fileInfo20.Length];
            using (FileStream fs = fileInfo20.OpenRead())
            {
                fs.Read(turtleneckData, 0, turtleneckData.Length);
            }

            FileInfo fileInfo21 = new FileInfo(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "Images", "Memory_Foam_Mattress.jpg"));
            byte[] mattressData = new byte[fileInfo21.Length];
            using (FileStream fs = fileInfo21.OpenRead())
            {
                fs.Read(mattressData, 0, mattressData.Length);
            }

            var products = new List<Product>
            {
                new Product
                {
                    Title = "Shovel",
                    Description = "Firm stainless steel frame",
                    Price = 15.99M,
                    Quantity = 1,
                    Created = DateTime.Parse("04/02/2009 17:32:00"),
                    Category = "Gardening",
                    Image = shovelData
                },
                new Product
                {
                    Title = "New Airpods",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget ex nisi. Donec fermentum vel magna nec condimentum. Integer sed elementum orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in tellus eget enim volutpat elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                    Price = 179.99M,
                    Quantity = 5,
                    Category = "Electronics",
                    Created = DateTime.Parse("04/01/2019 11:32:00"),
                    Image = aipodsData
                },
                new Product
                {
                    Title = "OnePlus 7",
                    Description = "Brand new.",
                    Price = 550.99M,
                    Quantity = 89,
                    Created = DateTime.Parse("01/12/2019 05:00:00"),
                    Category = "Electronics",
                    Image = onePlusData
                },
                new Product
                {
                    Title = "God of war",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget ex nisi. Donec fermentum vel magna nec condimentum. Integer sed elementum orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in tellus eget enim volutpat elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                    Price = 50.99M,
                    Quantity = 3,
                    Created = DateTime.Parse("02/28/2019 19:35:00"),
                    Category = "Video Games",
                    Image = gowData
                },
                new Product
                {
                    Title = "The Selfish Gene by Richard Dawkins",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget ex nisi. Donec fermentum vel magna nec condimentum. Integer sed elementum orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in tellus eget enim volutpat elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                    Price = 20.99M,
                    Quantity = 66,
                    Created = DateTime.Parse("03/05/2019 16:15:00"),
                    Category = "Books",
                    Image = geneData
                },
                new Product
                {
                    Title = "Cyclist helmet",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget ex nisi. Donec fermentum vel magna nec condimentum. Integer sed elementum orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in tellus eget enim volutpat elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                    Price = 15.20M,
                    Quantity = 2,
                    Created = DateTime.Parse("01/01/2019 00:55:00"),
                    Category = "Sports",
                    Image = helmetData
                },
                new Product
                {
                    Title = "Jabra Elite T45",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget ex nisi. Donec fermentum vel magna nec condimentum. Integer sed elementum orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in tellus eget enim volutpat elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                    Price = 160.00M,
                    Quantity = 1,
                    Created = DateTime.Now,
                    Category = "Electronics",
                    Image = jabraData
                },
                new Product
                {
                    Title = "Doom",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget ex nisi. Donec fermentum vel magna nec condimentum. Integer sed elementum orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in tellus eget enim volutpat elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                    Price = 19.50M,
                    Quantity = 1,
                    Created = DateTime.Parse("03/02/2019 07:00:00"),
                    Category = "Video Games",
                    Image = doomData
                },
                new Product
                {
                    Title = "Memory foam mattress",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget ex nisi. Donec fermentum vel magna nec condimentum. Integer sed elementum orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in tellus eget enim volutpat elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                    Price = 499.00M,
                    Quantity = 7,
                    Created = DateTime.Parse("03/02/2019 06:30:00"),
                    Category = "Health",
                    Image = mattressData
                },
                new Product
                {
                    Title = "Dell XPS 15",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget ex nisi. Donec fermentum vel magna nec condimentum. Integer sed elementum orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in tellus eget enim volutpat elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                    Price = 1199.99M,
                    Quantity = 30,
                    Created = DateTime.Parse("04/02/2019 11:39:00"),
                    Category = "Electronixs",
                    Image = xpsData
                },
                new Product
                {
                    Title = "Boss",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget ex nisi. Donec fermentum vel magna nec condimentum. Integer sed elementum orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in tellus eget enim volutpat elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                    Price = 15.99M,
                    Quantity = 1,
                    Created = DateTime.Parse("04/02/2019 13:29:00"),
                    Category = "Perfume",
                    Image = bossData
                },
                new Product
                {
                    Title = "Basketball",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget ex nisi. Donec fermentum vel magna nec condimentum. Integer sed elementum orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in tellus eget enim volutpat elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                    Price = 21.99M,
                    Quantity = 1,
                    Created = DateTime.Parse("04/01/2019 18:44:00"),
                    Category = "Sports",
                    Image = basketballData
                },
                new Product
                {
                    Title = "Football",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget ex nisi. Donec fermentum vel magna nec condimentum. Integer sed elementum orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in tellus eget enim volutpat elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                    Price = 18.99M,
                    Quantity = 1,
                    Created = DateTime.Parse("04/03/2019 09:32:00"),
                    Category = "Sports",
                    Image = footballData
                },
                new Product
                {
                    Title = "Dove 200ml",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget ex nisi. Donec fermentum vel magna nec condimentum. Integer sed elementum orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in tellus eget enim volutpat elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                    Price = 7.99M,
                    Quantity = 1,
                    Created = DateTime.Parse("03/25/2019 15:32:00"),
                    Category = "Health",
                    Image = doveData
                },
                new Product
                {
                    Title = "Angel, 120ml",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget ex nisi. Donec fermentum vel magna nec condimentum. Integer sed elementum orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in tellus eget enim volutpat elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                    Price = 79.99M,
                    Quantity = 1,
                    Created = DateTime.Parse("01/09/2019 08:30:00"),
                    Category = "Perfume",
                    Image = angelData
                },
                new Product
                {
                    Title = "Iron cast pan",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget ex nisi. Donec fermentum vel magna nec condimentum. Integer sed elementum orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in tellus eget enim volutpat elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                    Price = 14.00M,
                    Quantity = 1,
                    Created = DateTime.Parse("03/22/2019 09:00:00"),
                    Category = "Health",
                    Image = panData
                },
                new Product
                {
                    Title = "Sapiens by Yuval Noah Harari",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget ex nisi. Donec fermentum vel magna nec condimentum. Integer sed elementum orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in tellus eget enim volutpat elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                    Price = 24.99M,
                    Quantity = 1,
                    Created = DateTime.Parse("03/23/2019 11:45:00"),
                    Category = "Books",
                    Image = sapiensData
                },
                new Product
                {
                    Title = "Gucci scarf",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget ex nisi. Donec fermentum vel magna nec condimentum. Integer sed elementum orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in tellus eget enim volutpat elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                    Price = 45.00M,
                    Quantity = 1,
                    Created = DateTime.Parse("03/28/2019 08:11:00"),
                    Category = "Fashion",
                    Image = scarfData
                },
                new Product
                {
                    Title = "Black turtleneck",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget ex nisi. Donec fermentum vel magna nec condimentum. Integer sed elementum orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in tellus eget enim volutpat elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                    Price = 19.99M,
                    Quantity = 4,
                    Created = DateTime.Parse("04/02/2019 10:22:12"),
                    Category = "Fashion",
                    Image = turtleneckData
                },
                new Product
                {
                    Title = "Waking up by Sam Harris",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget ex nisi. Donec fermentum vel magna nec condimentum. Integer sed elementum orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in tellus eget enim volutpat elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                    Price = 16.99M,
                    Quantity = 7,
                    Created = DateTime.Now,
                    Category = "Books",
                    Image = wakingData
                }

            };

            products.ForEach(t => context.Products.Add(t));

            var creditCards = new List<CreditCard>
            {
                new CreditCard
                {
                    Number = "7777-6666-5555-4444",
                    ExpirationDate = "19/12",
                    SecurityCode = 055,
                    Balance = 1000
                },
                new CreditCard
                {
                    Number = "1111-2222-3333-4444",
                    ExpirationDate = "22/02",
                    SecurityCode = 055,
                    Balance = 1000
                },
                new CreditCard
                {
                    Number = "3456-6695-5202-2878",
                    ExpirationDate = "19/03",
                    SecurityCode = 055,
                    Balance = 1000
                }
            };

            creditCards.ForEach(t => context.CreditCards.Add(t));

            context.SaveChanges();
        }
    }
}