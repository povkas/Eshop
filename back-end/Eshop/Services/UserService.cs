using AutoMapper;
using CryptoHelper;
using Eshop.Data.Repositories;
using Eshop.DTOs.Users;
using Eshop.Models;
using Eshop.Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace Eshop.Services
{
    public class UserService : IUserService
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

        public async Task<UserDto> CreateUser(NewUserDto newItem)
        {
            var user = _mapper.Map<User>(newItem);
            user.IsAdmin = false;
            string hashedPassword = HashPassword(user.Password);
            user.Password = hashedPassword;
            await _repository.Create(user);
            var userDto = _mapper.Map<UserDto>(user);
            return userDto;
        }

        public async Task<ICollection<UserDto>> GetAll()
        {
            var users = await _repository.GetAll();
            var allUsers = _mapper.Map<UserDto[]>(users);
            return allUsers;
        }

        public async Task<UserDto> GetByEmail(string email)
        {
            var users = await _repository.GetAll();
            var filteredUser = users.Where(user => user.Email == email).First();
            var mapUser = _mapper.Map<UserDto>(filteredUser);
            return mapUser;
        }

        public async Task<bool> Delete(string email)
        {
            var allUsers = await _repository.GetAll();
            foreach (User user in allUsers)
            {
                if (user.Email == email)
                {
                    await _repository.Delete(user);
                    return true;
                }
            }
            return false;
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

        public async Task<string> CheckCredentials(LoginRequestDto userLogin)
        {
            var users = await _repository.GetAll();
            foreach (User user in users)
            {
                if (userLogin.Email == user.Email && VerifyPassword(user.Password, userLogin.Password))
                {
                    return user.IsAdmin.ToString();
                }
            }
            return null;
        }

        public string HashPassword(string password)
        {
            return Crypto.HashPassword(password);
        }

        public bool VerifyPassword(string hash, string password)
        {
            return Crypto.VerifyHashedPassword(hash, password);
        }
    }
}