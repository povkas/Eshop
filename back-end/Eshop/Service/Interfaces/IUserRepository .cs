using System;
using System.Collections.Generic;
using Eshop.Models;

namespace Eshop.Interfaces
{
    public interface IUserRepository : IDisposable
    {
        IEnumerable<User> GetUsers();
        bool CreatUser(User productToCreate);
        void InserUser(User user);
        void Save();
    }
}
