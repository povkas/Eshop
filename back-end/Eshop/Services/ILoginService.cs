using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Models;
namespace Eshop.Services
{
    public interface ILoginService
    {
        // bool CreateUser(User user);
        Task<User> DoesUserExist(string email, string password);       
    }
}
