using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Eshop.Configurations;
using Eshop.Data.Repositories;
using Eshop.Models;
using Eshop.Services;
using Eshop.Services.Interfaces;
using Moq;
using NUnit.Framework;

namespace NUnitTestProject.Services
{
    internal class ProductCategoriesServiceTest
    {
        private IProductCategoriesService _service;

        [SetUp]
        public void Setup()
        {
            var repositoryMock = new Mock<IRepository<ProductCategory>>();
            var mapperMock = new Mock<IMapper>();

            // mapperMock.Setup(m => m.Map<User, UserDto>(It.IsAny<User>())).Returns(new UserDto());

            var objects = new List<ProductCategory>
            {
                new ProductCategory {Category = "Electronics"},
                new ProductCategory {Category = "Sports"},
                new ProductCategory {Category = "Fashion"},
            };

            repositoryMock.Setup(x => x.GetAll()).Returns(Task.FromResult((ICollection<ProductCategory>)objects));


            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperConfiguration());
            });
            var mapper = config.CreateMapper();

           _service = new ProductCategoryService(repositoryMock.Object, mapper);
        }

        [Test]
        public void Test()
        {
            var products = _service.GetAll();
            Assert.AreEqual(products.Result.Count, 3);
        }
    }
}