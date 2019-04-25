using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.DTOs.CreditCards;
using Eshop.DTOs.Products;
using Eshop.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace Eshop.Services.Interfaces
{
    public interface ICreditCardService
    {
        Task<CreditCardDto> GetByNumber(string number);


        Task<bool> PartialUpdate(string number, PatchCreditCardDto itemPatch);
    }
}
