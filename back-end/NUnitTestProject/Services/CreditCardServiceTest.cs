using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Eshop.Configurations;
using Eshop.Data.Repositories;
using Eshop.DTOs.CreditCards;
using Eshop.ExceptionHandling;
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


            repositoryMock.Setup(x => x.GetByNumber("7777-6666-5555-4444"))
                .Returns(Task.FromResult(objects.ElementAt(0)));
            repositoryMock.Setup(x => x.Update(objects.ElementAt(0))).Returns(Task.FromResult(true));

            var config = new MapperConfiguration(cfg => { cfg.AddProfile(new AutoMapperConfiguration()); });
            var mapper = config.CreateMapper();

            _service = new CreditCardService(repositoryMock.Object, mapper, loggerMock.Object);
        }

        [Test]
        public void GetCreditCardByNumberTest()
        {
            var products = _service.GetByNumber("7777-6666-5555-4444");
            Assert.AreEqual(products.Result.Number, "7777-6666-5555-4444");
        }

        [Test]
        public void CreditCardPartialUpdateTest()
        {
            var patch = new PatchCreditCardDto()
            {
                Balance = 100
            };
            var res = _service.PartialUpdate("7777-6666-5555-4444", patch);

            Assert.IsTrue(res.Result);
        }
    }
}
