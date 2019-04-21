using System.Threading.Tasks;
using Eshop.Models;

namespace Eshop.Data.Repositories
{
    public interface ICreditCardsRepository
    {
        Task<CreditCard> GetByNumber(string number);
    }
}
