using Eshop.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Eshop.Services.Interfaces
{
    public interface IProductCategoriesService
    {
        Task<ICollection<ProductCategoryDto>> GetAll();
    }
}