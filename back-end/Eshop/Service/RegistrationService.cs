using AutoMapper;
using Ehop.Data.Repositories;
using Eshop.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using EntityModel = Eshop.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using static Eshop.Models.UserRepository;

namespace Eshop.Service
{
    public class RegistrationService : IUserService
    {
        private ModelStateDictionary _modelState;
        private IUserRepository _repository;
        private ModelStateDictionary modelState;
        private EntityModel.Context context;
        private Microsoft.EntityFrameworkCore.DbSet<User> users;

        public RegistrationService(ModelStateDictionary modelState, IUserRepository repository)
        {
            _modelState = modelState;
            _repository = repository;
        }

        public RegistrationService(ModelStateDictionary modelState, EntityModel.Context context)
        {
            this.modelState = modelState;
            this.context = context;
        }

        public RegistrationService(ModelStateDictionary modelState, Microsoft.EntityFrameworkCore.DbSet<User> users)
        {
            this.modelState = modelState;
            this.users = users;
        }

        protected bool ValidateUser(User user)
        {
            if (user.Name.Trim().Length == 0)
                _modelState.AddModelError("Name", "Name is required.");
            if (user.Surname.Trim().Length == 0)
                _modelState.AddModelError("Surname", "Surname is required.");
            if (user.Email.Trim().Length == 0)
                _modelState.AddModelError("Email", "Email is required");
            if (user.Country.Trim().Length == 0)
                _modelState.AddModelError("Country", "Country is required.");
            if (user.City.Trim().Length == 0)
                _modelState.AddModelError("City", "City is required.");
            if (user.Address.Trim().Length == 0)
                _modelState.AddModelError("Address", "Address is required");
            if (user.Password.Trim().Length == 0)
                _modelState.AddModelError("Password", "Password is required.");
            if (user.ConfirmPassword.Trim().Length == 0)
                _modelState.AddModelError("ConfirmPassword", "ConfirmPassword is required.");
            return _modelState.IsValid;
        }
        public IEnumerable<User> ListUsers()
        {
            return _repository.ListUsers();
        }
        public bool CreateUser(User user)
        {
            // Validation logic
            if (!ValidateUser(user))
                return false;

            // Database logic
            try
            {
                _repository.CreateUser(user);
            }
            catch
            {
                return false;
            }
            return true;
        }

    }
    public interface IUserService
    {
        bool CreateUser(User user);
        IEnumerable<User> ListUsers();
    }
}
