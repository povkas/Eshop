using System.Collections.Generic;
using AutoMapper;
using CryptoHelper;
using Eshop.Data.Repositories;
using Eshop.DTOs.Users;
using Eshop.Models;
using Eshop.Services;
using Eshop.Services.Interfaces;
using Moq;
using NUnit.Framework;

namespace NUnitTestProject.Services
{
    public class Tests
    {
        private IUserService _service;

        [SetUp]
        public void Setup()
        {
            var usersMock = new Mock<IRepository<User>>();
            var mapperMock = new Mock<IMapper>();

            mapperMock.Setup(m => m.Map<User, UserDto>(It.IsAny<User>())).Returns(new UserDto());

            var objects = new List<User>
            {
                new User{Name = "Dave", Surname = "Smith", Email = "user@email.com", Country = "Lithuania", City = "Kaunas",
                    Address = "Studentø g. 50-201", Password = Crypto.HashPassword("user1234"), IsAdmin = false},
                new User{Name = "Dave", Surname = "Smith", Email = "admin@email.com", Country = "Lithuania", City = "Kaunas",
                    Address = "Studentø g. 50-201", Password = Crypto.HashPassword("admin1234"), IsAdmin = true}
            };

            _service = new UserService(usersMock.Object, mapperMock.Object);
        }

        [Test]
        public void Test()
        {
            var products = _service.GetAll();
            Assert.AreEqual(products.Result.Count, 0);
        }

        [Test]
        public void Test2()
        {
            var products = _service.GetAll();
            Assert.AreEqual(products.Result.Count, 0);
        }
    }
}