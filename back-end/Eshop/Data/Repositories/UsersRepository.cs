using Eshop.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Eshop.Data.Repositories
{
    public class UsersRepository : RepositoryBase<User>
    {
        protected override DbSet<User> ItemSet { get; }

        public UsersRepository(Context context) : base(context)
        {
            ItemSet = context.Users;
        }

        protected override IQueryable<User> IncludeDependencies(IQueryable<User> queryable)
        {
            return queryable;
        }
    }
}