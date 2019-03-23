using Eshop.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Eshop.DTOs.Products;

namespace Eshop.Services.Interfaces
{
    public interface IUserService
    {
        Task<User> GetById(int id);

        Task<User> CreateUser(User user);

        Task<bool> CheckUserExistence(User newbie);

        string ValidateUser(User user);

        Task<bool> Delete(int id);

        Task<ICollection<User>> GetAll();

        Task<bool> CheckIfUserExists(UserDto user);
    }
}