using AutoMapper;
using Eshop.Data.Repositories;
using Eshop.DTOs.Products;
using Eshop.Models;
using System.Linq;
using System.Threading.Tasks;

namespace Eshop.Services
{
    public class LoginService : ILoginService
    {
        private readonly IRepository<User> _repository;

        public LoginService(IRepository<User> repository, IMapper mapper)
        {
            _repository = repository;
        }

        public async Task<bool> CheckIfUserExists(UserDto user)
        {
            var products = await _repository.GetAll();

            foreach (User a in products)
            {
                if (a.Email == user.Email && a.Password == user.Password)
                {
                    return true;
                }
            }
            return false;
        }
    }
}