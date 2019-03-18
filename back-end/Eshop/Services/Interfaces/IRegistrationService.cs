using Eshop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eshop.Services.Interfaces
{
    public interface IRegistrationService
    {
        Task<User> CreateUser(User user);
        Task<bool> CheckUserExistence(User newbie);
        string ValidateUser(User user);
    }
}
