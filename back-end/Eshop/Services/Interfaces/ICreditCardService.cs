using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Models;

namespace Eshop.Services.Interfaces
{
    public class ICreditCardService
    {
        Task<ICollection<CreditCard>> GetAll;
    }
}
