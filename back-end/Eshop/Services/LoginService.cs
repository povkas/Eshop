using System.Linq;
using System.Threading.Tasks;
using Eshop.Models;
using AutoMapper;
using Eshop.Data.Repositories;
using Eshop.DTOs.Products;

namespace Eshop.Services
{
    public class LoginService : ILoginService
    {
        private readonly IRepository<User> _repository;
        private readonly IMapper _mapper;


        public LoginService(IRepository<User> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<bool> DoesUserExist(UserDto user)
        {
            var products = _repository.GetAll().Result.ToList();        
          
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

