using Eshop.DTOs.Users;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Eshop.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> GetById(int id);

        Task<UserDto> CreateUser(NewUserDto user);

        Task<bool> CheckUserExistence(NewUserDto user);

        Task<bool> Delete(string id);

        Task<ICollection<UserDto>> GetAll();
        
        Task<UserDto> GetByEmail(string email);

        Task<string> CheckCredentials(LoginRequestDto user);
    }
}