using Eshop.Models;
using System.Threading.Tasks;

namespace Eshop.Data.Repositories
{
    public interface ICreditCardsRepository
    {
        Task<CreditCard> GetByNumber(string number);

        Task<bool> Update(CreditCard creditCard);
    }
}