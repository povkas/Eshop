using AutoMapper;
using Eshop.Data.Repositories;
using Eshop.DTOs.Products;
using Eshop.Models;
using EShop.DTOs.Products;
using EShop.Services.Interfaces;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EShop.Services
{
    public class ProductService : IProductsService
    {
        private readonly IRepository<Product> _repository;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;

        public ProductService(IRepository<Product> repository, IMapper mapper, ILogger<ProductService> logger)
        {
            _repository = repository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<ProductDto> GetById(int id)
        {
            var product = await _repository.GetById(id);
            var productDto = _mapper.Map<ProductDto>(product);
            return productDto;
        }

        public async Task<ICollection<ProductDto>> GetAll()
        {
            var products = await _repository.GetAll();
            var productsDto = _mapper.Map<ICollection<ProductDto>>(products);
            return productsDto;
        }
        
        public async Task<ProductDto> Create(NewProductDto newItem)
        {
            if (newItem == null) throw new ArgumentNullException(nameof(newItem));

            var product = CreateProductPoco(newItem);
            await _repository.Create(product);

            var productDto = _mapper.Map<ProductDto>(product);
            return productDto;
        }

        public async Task Update(int id, NewProductDto updateData)
        {
            if (updateData == null) throw new ArgumentNullException(nameof(updateData));

            var itemToUpdate = await _repository.GetById(id);
            if (itemToUpdate == null)
            {
                throw new InvalidOperationException($"Product {id} was not found");
            }

            _mapper.Map(updateData, itemToUpdate);
            await _repository.Update(itemToUpdate);
        }

        public async Task<bool> PartialUpdate(int id, JsonPatchDocument<PatchProductDto> itemPatch)
        {
            if (itemPatch == null) throw new ArgumentNullException(nameof(itemPatch));

            var itemToUpdate = await _repository.GetById(id);
            _logger.LogInformation("Got object to update {itemToUpdate} by id {ID}", itemToUpdate, id);

            if (itemToUpdate == null)
            {
                throw new InvalidOperationException($"Product {id} was not found");
            }

            var updateData = _mapper.Map<PatchProductDto>(itemToUpdate);
            _logger.LogInformation("Mapped object to update {UPDATEDATA}", updateData);

            itemPatch.ApplyTo(updateData);
            _logger.LogInformation("Patched object with update data {ItemPatch}", itemPatch);

            _mapper.Map(updateData, itemToUpdate);
            var updated = await _repository.Update(itemToUpdate);
            return updated;
        }

        public async Task<bool> Delete(int id)
        {
            var item = await _repository.GetById(id);
            if (item == null)
            {
                return false;
            }

            var deleted = await _repository.Delete(item);
            return deleted;
        }
        
        private Product CreateProductPoco(NewProductDto newItem)
        {
            var product = _mapper.Map<Product>(newItem);
            product.Created = DateTime.Now;
            return product;
        }
    }
}