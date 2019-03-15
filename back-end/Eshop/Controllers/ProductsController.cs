using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Eshop.DTOs.Products;
using EShop.DTOs.Products;
using EShop.Services.Interfaces;

namespace EShop.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsService _productsService;

        public ProductsController(IProductsService productsService)
        {
            _productsService = productsService;
        }

        [HttpGet]
        [Produces(typeof(ProductDto[]))]
        public async Task<IActionResult> Get()
        {
            var products = await _productsService.GetAll();

            return Ok(products);
        }

        [HttpGet("{id}")]
        [Produces(typeof(ProductDto))]
        public async Task<IActionResult> Get(int id)
        {
            var product = await _productsService.GetById(id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpPost]
        [Produces(typeof(ProductDto))]
        public async Task<IActionResult> Post([FromBody] NewProductDto newProduct)
        {
            var createdProduct = await _productsService.Create(newProduct);
            
            return Ok(createdProduct);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] NewProductDto newProduct)
        {
            await _productsService.Update(id, newProduct);

            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(int id, [FromBody] JsonPatchDocument<NewProductDto> patch)
        {
            await _productsService.PartialUpdate(id, patch);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _productsService.Delete(id);

            return NoContent();
        }
    }
}