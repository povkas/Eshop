using Eshop.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Eshop.DTOs.Products;
using Eshop.DTOs.Users;

namespace Eshop.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> GetById(int id);

        Task<NewUserDto> CreateUser(NewUserDto user);

        Task<bool> CheckUserExistence(NewUserDto user);

        string ValidateUser(User user);

        Task<bool> Delete(int id);

        Task<ICollection<UserDto>> GetAll();

        Task<bool> CheckIfUserExists(UserDto user);
    }
}