using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Models;
using Microsoft.EntityFrameworkCore;

namespace Eshop.Data
{
    public class SeedData
    {
        public static void Seed(Context context)
        {
            if (context.Users.Any())
                return;

            var users = new List<User>
            {
                new User{Email = "admin@gmail.com", Password= "root1234", Role = "ADMIN", Address = "Address"},
                new User{Email = "user@gmail.com", Password= "root1234", Role = "NORMAL", Address = "Address"}
            };

            users.ForEach(t => context.Users.Add(t));

            context.SaveChanges();
        }
    }
}
