using AutoMapper;
using Eshop.Data.Repositories;
using Eshop.Models;
using Eshop.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.DTOs.Products;

namespace Eshop.Services
{
    public class UserService : Controller, IUserService
    {
        private readonly IRepository<User> _repository;
        private readonly IMapper _mapper;

        public UserService(IRepository<User> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<User> GetById(int id)
        {
            var product = await _repository.GetById(id);
            var productDto = _mapper.Map<User>(product);
            return productDto;
        }

        public async Task<User> CreateUser(User user)
        {
            user.IsAdmin = false;
            await _repository.Create(user);
            return user;
        }

        public async Task<ICollection<User>> GetAll()
        {
            var users = await _repository.GetAll();
            var allUsers = _mapper.Map<User[]>(users);
            return allUsers;
        }

        public async Task<bool> Delete(int id)
        {
            var item = await _repository.GetById(id);
            if (item == null)
            {
                return false;
            }

            var deleted = await _repository.Delete(item);
            return deleted;
        }

        public async Task<bool> CheckUserExistence(User newUser)
        {
            var allUsers = await _repository.GetAll();
            foreach (User user in allUsers)
            {
                if (user.Email == newUser.Email)
                    return false;
            }
            return true;
        }

        public async Task<bool> CheckIfUserExists(UserDto user)
        {
            var products = await _repository.GetAll();

            foreach (User a in products)
            {
                if (a.Email == user.Email && a.Password == user.Password)
                {
                    return true;
                }
            }
            return false;
        }

        public string ValidateUser(User user)
        {
            string errorMessage = "";
            foreach (var error in ViewData.ModelState.Values.SelectMany(modelState => modelState.Errors))
            {
                errorMessage = errorMessage + error.ErrorMessage;
            };
            return errorMessage;
        }
    }
}