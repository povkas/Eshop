using Eshop.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Eshop.Services.Interfaces
{
    public interface IRegistrationService
    {
        Task<User> GetById(int id);

        Task<User> CreateUser(User user);

        Task<bool> CheckUserExistence(User newbie);

        string ValidateUser(User user);

        Task<bool> Delete(int id);

        Task<ICollection<User>> GetAll();
    }
}