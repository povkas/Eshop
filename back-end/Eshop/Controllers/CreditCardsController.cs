using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.DTOs.CreditCards;
using Eshop.Models;
using Eshop.Services;
using Eshop.Services.Interfaces;
using EShop.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Eshop.Controllers
{
    [Route("api/credit-cards")]
    [ApiController]
    public class CreditCardsController : ControllerBase
    {
        private readonly ICreditCardService _service;
        private readonly ILogger _logger;

        public CreditCardsController(ICreditCardService service, ILogger<CreditCardsController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet("{number}")]
        public async Task<IActionResult> CheckIfCreditCardExists(string number)
        {
            _logger.LogInformation("Getting credit card by number {NUMBER}", number);
            var creditCard = await _service.GetByNumber(number);
            _logger.LogInformation("Received credit card - {}", creditCard);

            if (creditCard == null)
            {
                return Ok(false);
            }

            return Ok(true);
        }
    }
}
