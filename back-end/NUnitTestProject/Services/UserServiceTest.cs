using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CryptoHelper;
using Eshop.Configurations;
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
            var repositoryMock = new Mock<IRepository<User>>();
            var mapperMock = new Mock<IMapper>();

            mapperMock.Setup(m => m.Map<User, UserDto>(It.IsAny<User>())).Returns(new UserDto());

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperConfiguration());
            });
            var mapper = config.CreateMapper();

            var objects = new List<User>
            {
                new User{Name = "Dave", Surname = "Smith", Email = "user@email.com", Country = "Lithuania", City = "Kaunas",
                    Address = "Studentø g. 50-201", Password = Crypto.HashPassword("user1234"), IsAdmin = false},
                new User{Name = "Dave", Surname = "Smith", Email = "admin@email.com", Country = "Lithuania", City = "Kaunas",
                    Address = "Studentø g. 50-201", Password = Crypto.HashPassword("admin1234"), IsAdmin = true}
            };

            repositoryMock.Setup(x => x.GetAll()).Returns(Task.FromResult((ICollection<User>)objects));
            repositoryMock.Setup(x => x.GetById(0)).Returns(Task.FromResult(objects.ElementAt(0)));

            _service = new UserService(repositoryMock.Object, mapper);
        }

        [Test]
        public void GetByIdUserTest()
        {
            var user = _service.GetById(0);
            Assert.AreEqual(user.Result.Email, "user@email.com");
        }

        [Test]
        public void GetByEmailUserTest()
        {
            var user = _service.GetByEmail("user@email.com");
            Assert.AreEqual(user.Result.Email, "user@email.com");
        }

        [Test]
        public void GetAllUsersTest()
        {
            var users = _service.GetAll();
            Assert.AreEqual(users.Result.Count, 2);
        }

        [Test]
        public void DeleteUserTest()
        {
            var isDeleted = _service.Delete("user@email.com");
            Assert.IsTrue(isDeleted.Result);
        }

        [Test]
        public void CheckIfUserUniqueTest()
        {
            var newUserDto = new NewUserDto
            {
                Name = "Dave", Surname = "Smith", Email = "admin@email.com", Country = "Lithuania", City = "Kaunas",
                    Address = "Studentø g. 50-201", Password = "admin1234", IsAdmin = true
            };

            var exists = _service.CheckIfUserUnique(newUserDto);
            Assert.IsFalse(exists.Result);
        }

        [Test]
        public void CheckIfUserAdmin()
        {
            var credentials = new LoginRequestDto()
            {
                Email = "admin@email.com",
                Password = "admin1234"
            };
            var role = _service.CheckIfUserAdmin(credentials);
            Assert.AreEqual("True", role.Result.ToString());
        }

        [Test]
        public void CreateUserTest()
        {
            var newUserDto = new NewUserDto
            {
                Name = "Dave",
                Surname = "Smith",
                Email = "test@email.com",
                Country = "Lithuania",
                City = "Kaunas",
                Address = "Studentø g. 50-201",
                Password = "admin1234",
                IsAdmin = true
            };

            Assert.AreEqual(_service.Create(newUserDto).Result.Email, "test@email.com");
        }
    }
}