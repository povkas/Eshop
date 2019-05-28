using Eshop.DTOs.Users;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Eshop.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> GetById(int id);

        Task<UserDto> Create(NewUserDto user);

        Task<bool> CheckIfUserUnique(NewUserDto user);

        Task<bool> Delete(string id);

        Task<ICollection<UserDto>> GetAll();
        
        Task<UserDto> GetByEmail(string email);

        Task<string> CheckIfUserAdmin(LoginRequestDto user);
    }
}