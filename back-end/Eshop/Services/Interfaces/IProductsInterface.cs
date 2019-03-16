﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Eshop.DTOs.Products;
using EShop.DTOs.Products;
using Microsoft.AspNetCore.JsonPatch;

namespace EShop.Services.Interfaces
{
    public interface IProductsService
    {
        Task<ProductDto> GetById(int id);
        Task<ICollection<ProductDto>> GetAll();
        Task<ProductDto> Create(NewProductDto newItem);
        Task Update(int id, NewProductDto updateData);
        Task<bool> PartialUpdate(int id, JsonPatchDocument<NewProductDto> itemPatch);
        Task<bool> Delete(int id);
    }
}
