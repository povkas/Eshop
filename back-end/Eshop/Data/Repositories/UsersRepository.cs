
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Eshop.Data;
using Eshop.Data.Repositories;
using Eshop.Models;

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
