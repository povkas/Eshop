using Ehop.Data.Repositories;
using Eshop.Models;
using Eshop.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eshop.Service
{
    public class RegistrationService : IRegistrationService
    {
        private IRepository<User> repo;
        public RegistrationService(IRepository<User> repo)
        {
            this.repo = repo;
        }
        public async Task<User> Create(User user)
        {
            await repo.Create(user);         
            return user;
        }
        public async Task<bool> UserNotExist(User user)
        {
            List<User> aa = repo.GetAll().Result.ToList();
            foreach (User a in aa)
            {
                if (a.Email == user.Email)
                    return false;
            }
            return true;
        }
    }
}
