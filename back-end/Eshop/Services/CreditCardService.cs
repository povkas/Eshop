using System.Threading.Tasks;
using AutoMapper;
using Eshop.Data.Repositories;
using Eshop.DTOs.CreditCards;
using Eshop.Services.Interfaces;

namespace Eshop.Services
{
    public class CreditCardService : ICreditCardService
    {
        private readonly ICreditCardsRepository _repository;
        private readonly IMapper _mapper;

        public CreditCardService(ICreditCardsRepository repository,
            IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<CreditCardDto> GetByNumber(string number)
        {
            var creditCards = await _repository.GetByNumber(number);
            var creditCardDto = _mapper.Map<CreditCardDto>(creditCards);

            return creditCardDto;
        }
    }
}
