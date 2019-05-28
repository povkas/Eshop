using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CryptoHelper;
using Eshop.Configurations;
using Eshop.Data.Repositories;
using Eshop.DTOs.Products;
using Eshop.DTOs.Users;
using Eshop.Models;
using EShop.DTOs.Products;
using EShop.Services;
using EShop.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;

namespace NUnitTestProject.Services
{
    internal class ProductServiceTest
    {
        private IProductsService _service;

        [SetUp]
        public void Setup()
        {
            var repositoryMock = new Mock<IRepository<Product>>();
            var loggerMock = new Mock<ILogger<ProductService>>();
            var mapperMock = new Mock<IMapper>();

            FileInfo fileInfo1 = new FileInfo(Path.Combine(System.IO.Path.GetFullPath(@"..\..\..\..\Eshop"),
                "wwwroot", "Images", "onePlus7.jpg"));
            byte[] onePlusData = new byte[fileInfo1.Length];
            using (FileStream fs = fileInfo1.OpenRead())
            {
                fs.Read(onePlusData, 0, onePlusData.Length);
            }

            FileInfo fileInfo2 = new FileInfo(Path.Combine(System.IO.Path.GetFullPath(@"..\..\..\..\Eshop"),
                "wwwroot", "Images", "airpods2.jpg"));
            byte[] aipodsData = new byte[fileInfo2.Length];
            using (FileStream fs = fileInfo2.OpenRead())
            {
                fs.Read(aipodsData, 0, aipodsData.Length);
            }

            FileInfo fileInfo3 = new FileInfo(Path.Combine(System.IO.Path.GetFullPath(@"..\..\..\..\Eshop"),
                "wwwroot", "Images", "shovel.jpg"));
            byte[] shovelData = new byte[fileInfo3.Length];
            using (FileStream fs = fileInfo3.OpenRead())
            {
                fs.Read(shovelData, 0, shovelData.Length);
            }

            var objects = new List<Product>
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
                    Description =
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget ex nisi. Donec fermentum vel magna nec condimentum. Integer sed elementum orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in tellus eget enim volutpat elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
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
                }
            };

            //            mapperMock.Setup(
            //                m => m.Map<ICollection<ProductDto>>(It.IsAny<ICollection<Product>>())).Returns(new List<ProductDto>());

            mapperMock
                .Setup(m => m.Map<ProductDto, Product>(It.IsAny<ProductDto>()))
                .Returns((ProductDto e) => new Product
                {
                    Title = e.Title,
                    Description = e.Description,
                    Price = e.Price,
                    Quantity = e.Quantity,
                    Created = e.Created,
                    Category = e.Category,
                    Image = e.Image
                    //....other code removed for brevity
                });

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperConfiguration());
            });
            var mapper = config.CreateMapper();

            repositoryMock.Setup(x => x.GetAll()).Returns(Task.FromResult((ICollection<Product>)objects));
            repositoryMock.Setup(x => x.GetById(0)).Returns(Task.FromResult(objects.ElementAt(0)));
            repositoryMock.Setup(x => x.Delete(objects.ElementAt(0))).Returns(Task.FromResult(true));

            _service = new ProductService(repositoryMock.Object, mapper, loggerMock.Object);
        }

        [Test]
        public void GettingAllProductsTest()
        {
            var products = _service.GetAll();
            Assert.AreEqual(products.Result.Count, 3);
        }

        [Test]
        public void GetByIdProductTest()
        {
            var products = _service.GetById(0);
            Assert.AreEqual(products.Result.Title, "Shovel");
        }

        [Test]
        public void DeleteProductTest()
        {
            var products = _service.Delete(0);
            Assert.IsTrue(products.Result);
        }

        [Test]
        public void ProductCreateExceptionTest()
        {
            NewProductDto product = null;
            Console.WriteLine(_service.Create(product));
            Assert.Throws<ArgumentNullException>(() => _service.Create(product));
        }


    }
}