using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.DTOs.CreditCards;
using Eshop.Models;

namespace Eshop.Services.Interfaces
{
    public interface ICreditCardService
    {
        Task<CreditCardDto> GetByNumber(string number);
    }
}
