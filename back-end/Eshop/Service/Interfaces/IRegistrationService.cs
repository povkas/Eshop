using Eshop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eshop.Service.Interfaces
{
    public interface IRegistrationService
    {
        Task<User> Create(User user);
        Task<bool> UserNotExist(User user);
    }
}
