using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Eshop.Data.Repositories;
using Eshop.DTOs.CreditCards;
using Eshop.DTOs.Products;
using Eshop.ExceptionHandling;
using Eshop.Models;
using Eshop.Services.Interfaces;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.Extensions.Logging;

namespace Eshop.Services
{
    public class CreditCardService : ICreditCardService
    {
        private readonly ICreditCardsRepository _repository;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;

        public CreditCardService(ICreditCardsRepository repository,
            IMapper mapper, ILogger<CreditCardService> logger)
        {
            _repository = repository;
            _mapper = mapper;
            _logger = logger;

        }

        public async Task<CreditCardDto> GetByNumber(string number)
        {
            var creditCard = await _repository.GetByNumber(number);
            var creditCardDto = _mapper.Map<CreditCardDto>(creditCard);

            return creditCardDto;
        }

        public async Task<bool> PartialUpdate(string number, PatchCreditCardDto itemPatch)
        {
            if (itemPatch == null) throw new ArgumentNullException(nameof(itemPatch));

            var itemToUpdate = await _repository.GetByNumber(number);
            _logger.LogInformation("Got object to update {itemToUpdate} by number {number}", itemToUpdate, number);

            if (itemToUpdate == null)
            {
                throw new InvalidOperationException($"Credit card {number} was not found");
            }

            if (itemToUpdate.Balance - itemPatch.Balance < 0)
            {
                throw new IncorrectInputException($"Insufficient credit card funds");
            }

            itemToUpdate.Balance -= itemPatch.Balance;

            var updated = await _repository.Update(itemToUpdate);
            return updated;
        }
    }
}
