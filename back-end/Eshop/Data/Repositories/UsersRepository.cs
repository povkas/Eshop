using Microsoft.EntityFrameworkCore;
using System.Linq;
using Eshop.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace Eshop.Data.Repositories
{
    public class UsersRepository : RepositoryBase<User>
    {
        protected override DbSet<User> ItemSet { get; }
        private Context db = new Context();

        public UsersRepository(Context context) : base(context)
        {
            ItemSet = context.Users;
        }

        protected override IQueryable<User> IncludeDependencies(IQueryable<User> queryable)
        {
            return queryable;
        }
        public bool CreateUser(User user)
        {
            try
            {
                db.Users.Add(user);
                db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}