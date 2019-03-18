using AutoMapper;
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
        private readonly IRepository<User> repo;     
        private readonly IMapper _mapper;       
        public RegistrationService(IRepository<User> repo, IMapper mapper)
        {
            this.repo = repo;
            _mapper = mapper;
        }
        public async Task<User> GetById(int id)
        {
            var product = await repo.GetById(id);
            var productDto = _mapper.Map<User>(product);
            return productDto;
        }
        public async Task<User> CreateUser(User user)
        {
            await repo.Create(user);
            return user;
        }
        public async Task<ICollection<User>> GetAll()
        {
            var users = await repo.GetAll();
            var allUsers = _mapper.Map<User[]>(users);
            return allUsers;
        }
        public async Task<bool> Delete(int id)
        {
            var item = await repo.GetById(id);
            if (item == null)
            {
                return false;
            }

            var deleted = await repo.Delete(item);
            return deleted;
        }
        public async Task<bool> CheckUserExistence(User newUser)
        {
            List<User> allUsers = repo.GetAll().Result.ToList();
            foreach (User user in allUsers)
            {
                if (user.Email == newUser.Email)
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
