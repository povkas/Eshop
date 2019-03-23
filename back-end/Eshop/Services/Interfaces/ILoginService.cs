using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Models;
using Eshop.DTOs.Products;
namespace Eshop.Services
{
    public interface ILoginService
    {
        Task<bool> DoesUserExist(UserDto user);
    }
}
