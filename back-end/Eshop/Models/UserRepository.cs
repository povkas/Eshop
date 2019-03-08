using Eshop.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eshop.Models
{
    public class UserRepository : UserRepository.IUserRepository
    {        
            private Context db = new Context();

            public IEnumerable<User> ListUsers()
            {
                return db.Set<User>().ToList<User>();
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
        public interface IUserRepository
        {
            bool CreateUser(User user);
            IEnumerable<User> ListUsers();
        }
    }
}
