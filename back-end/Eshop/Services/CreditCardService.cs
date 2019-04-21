using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Eshop.Data.Repositories;
using Eshop.DTOs.CreditCards;
using Eshop.Models;
using Eshop.Services.Interfaces;
using Microsoft.Extensions.Logging;

namespace Eshop.Services
{
    public class CreditCardService : ICreditCardService
    {
        private IRepository<CreditCard> _repository;
        private readonly IMapper _mapper;

        public CreditCardService(IRepository<CreditCard> repository,
            IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<ICollection<CreditCardDto>> GetAll()
        {
            var creditCards = await _repository.GetAll();
            var creditCardDto = _mapper.Map<CreditCardDto[]>(creditCards);

            return creditCardDto;
        }
    }
}
