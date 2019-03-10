using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Data;
using Eshop.Models;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Ehop.Data.Repositories;
using System.Data.Entity;
using EntityModel = Eshop.Data;
using Microsoft.AspNetCore.Mvc.ModelBinding;


namespace Eshop.Services
{
    public class LoginService : ILoginService
    {
        private IRepository<User> repository;

        public LoginService(IRepository<User> repository)
        {
            this.repository = repository;
        }

        public async Task<User> UserExist(string email)
        {
            List<User> Db = repository.GetAll().Result.ToList();
            foreach (User a in Db)
            {
                if (a.Email == email)
                {
                    return a;
                }
            }
            return null;
        }

    }
}

