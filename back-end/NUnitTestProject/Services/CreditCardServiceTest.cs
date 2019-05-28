using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Eshop.Configurations;
using Eshop.Data.Repositories;
using Eshop.DTOs.CreditCards;
using Eshop.Models;
using Eshop.Services;
using Eshop.Services.Interfaces;
using EShop.Services;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;

namespace NUnitTestProject.Services
{
    class CreditCardServiceTest
    {
        private ICreditCardService _service;

        [SetUp]
        public void Setup()
        {
            var repositoryMock = new Mock<ICreditCardsRepository>();
            var loggerMock = new Mock<ILogger<CreditCardService>>();
            var mapperMock = new Mock<IMapper>();

            // mapperMock.Setup(m => m.Map<User, UserDto>(It.IsAny<User>())).Returns(new UserDto());

            var objects = new List<CreditCard>
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


            repositoryMock.Setup(x => x.GetByNumber("7777-6666-5555-4444")).Returns(Task.FromResult(objects.ElementAt(0)));

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperConfiguration());
            });
            var mapper = config.CreateMapper();

            _service = new CreditCardService(repositoryMock.Object, mapper, loggerMock.Object);
        }

        [Test]
        public void Test()
        {
            var products = _service.GetByNumber("7777-6666-5555-4444");
            Assert.AreEqual(products.Result.Number, "7777-6666-5555-4444");
        }
    }
}
