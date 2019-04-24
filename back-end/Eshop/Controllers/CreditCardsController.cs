using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.DTOs.CreditCards;
using Eshop.ExceptionHandling;
using Eshop.Models;
using Eshop.Services;
using Eshop.Services.Interfaces;
using EShop.Controllers;
using Microsoft.AspNetCore.JsonPatch;
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

        [HttpGet]
        public async Task<IActionResult> CheckIfCreditCardExists([FromBody] CreditCardDto creditCard)
        {
            _logger.LogInformation("Getting credit card by number {NUMBER}", creditCard.Number);
            var creditCardInDb = await _service.GetByNumber(creditCard.Number);
            _logger.LogInformation("Received credit card - {}", creditCard);

            if (creditCardInDb == null || creditCard.ExpirationDate != creditCardInDb.ExpirationDate || creditCard.SecurityCode != creditCardInDb.SecurityCode)
            {
                throw new IncorrectInputException("Incorrect credit card details");
            }

            return Ok(true);
        }

        [HttpPatch("{number}")]
        public async Task<IActionResult> Patch(string number, [FromBody] PatchCreditCardDto patch)
        {
            _logger.LogInformation("Patching credit card {NUMBER} with information {PATCH}", number, patch);
            await _service.PartialUpdate(number, patch);

            return NoContent();
        }
    }
}
