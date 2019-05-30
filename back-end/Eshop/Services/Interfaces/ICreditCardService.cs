using Eshop.DTOs.CreditCards;
using System.Threading.Tasks;

namespace Eshop.Services.Interfaces
{
    public interface ICreditCardService
    {
        Task<CreditCardDto> GetByNumber(string number);

        Task<bool> PartialUpdate(string number, PatchCreditCardDto itemPatch);
    }
}