using Eshop.DTOs.Products;
using System.Threading.Tasks;

namespace Eshop.Services
{
    public interface ILoginService
    {
        Task<bool> CheckIfUserExists(UserDto user);
    }
}