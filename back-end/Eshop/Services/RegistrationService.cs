using Ehop.Data.Repositories;
using Eshop.Models;
using Eshop.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eshop.Services
{
    public class RegistrationService : Controller, IRegistrationService
    {
        private IRepository<User> repo;
        public RegistrationService(IRepository<User> repo)
        {
            this.repo = repo;
        }
        public async Task<User> CreateUser(User user)
        {
            await repo.Create(user);
            return user;
        }
        public async Task<bool> CheckUserExistence(User newbie)
        {
            List<User> allUsers = repo.GetAll().Result.ToList();
            foreach (User user in allUsers)//pervadinti normaliai
            {
                if (user.Email == newbie.Email)
                    return false;
            }
            return true;
        }
        public string ValidateUser(User user)
        {
            string errorMessage = "";
            foreach (var error in ViewData.ModelState.Values.SelectMany(ModelState => ModelState.Errors))
            {
                errorMessage = errorMessage + (error.ErrorMessage);
            };
            return errorMessage;
        }
    }
}
