using AutoMapper;
using Eshop.Data.Repositories;
using Eshop.DTOs.Users;
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
            var productCategoriesMock = new Mock<IRepository<ProductCategory>>().Object;
            var mapperMock = new Mock<IMapper>();

            mapperMock.Setup(m => m.Map<User, UserDto>(It.IsAny<User>())).Returns(new UserDto());

            _service = new ProductCategoryService(productCategoriesMock, mapperMock.Object);
        }

        [Test]
        public void Test()
        {
            var products = _service.GetAll();
            Assert.AreEqual(products.Result.Count, 0);
        }
    }
}