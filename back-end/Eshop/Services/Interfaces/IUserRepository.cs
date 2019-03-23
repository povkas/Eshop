using Eshop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eshop.Services.Interfaces
{
    public interface IUserRepository
    {
        IEnumerable<User> GetUsers();
        bool CreatUser(User productToCreate);
        void InserUser(User user);
        void Save();
    }
}
