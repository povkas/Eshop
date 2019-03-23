using AutoMapper;
using Eshop.Data.Repositories;
using Eshop.DTOs;
using Eshop.Models;
using Eshop.Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Eshop.Services
{
    public class ProductCategoriesService : IProductCategoriesService
    {
        private readonly IRepository<ProductCategory> _repository;
        private readonly IMapper _mapper;

        public ProductCategoriesService(IRepository<ProductCategory> repository,
            IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<ICollection<ProductCategoryDto>> GetAll()
        {
            var productCategories = await _repository.GetAll();

            var productCategoriesDto = _mapper.Map<ProductCategoryDto[]>(productCategories);
            return productCategoriesDto;
        }
    }
}