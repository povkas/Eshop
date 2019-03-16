using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.DTOs;
using Eshop.Models;

namespace Eshop.Services.Interfaces
{
    public interface IProductCategoriesService
    {
        Task<ICollection<ProductCategoryDto>> GetAll();
    }
}
