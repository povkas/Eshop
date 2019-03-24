using AutoMapper;
using Eshop.Data.Repositories;
using Eshop.Models;
using Eshop.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Eshop.DTOs.Users;

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

        public async Task<UserDto> GetById(int id)
        {
            var product = await _repository.GetById(id);
            var productDto = _mapper.Map<UserDto>(product);
            return productDto;
        }

        public async Task<NewUserDto> CreateUser(NewUserDto newItem)
        {
            var user = _mapper.Map<User>(newItem);
            user.IsAdmin = false;
            await _repository.Create(user);
            var userDto = _mapper.Map<NewUserDto>(user);
            return userDto;
        }

        public async Task<ICollection<UserDto>> GetAll()
        {
            var users = await _repository.GetAll();
            var allUsers = _mapper.Map<UserDto[]>(users);
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

        public async Task<bool> CheckUserExistence(NewUserDto newItem)
        {
            var allUsers = await _repository.GetAll();
            foreach (User user in allUsers)
            {
                if (user.Email == newItem.Email)
                    return false;
            }
            return true;
        }

        public async Task<bool> CheckIfUserExists(LoginRequestDto userLogin)
        {
            var users = await _repository.GetAll();
            foreach (User user in users)
            {
                if (userLogin.Email == user.Email && userLogin.Password == user.Password)
                {
                    return true;
                }
            }
            return false;
        }
    }
}