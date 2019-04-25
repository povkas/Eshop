using Eshop.DTOs.Products;
using Eshop.ExceptionHandling;
using EShop.DTOs.Products;
using EShop.Services.Interfaces;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace EShop.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly IProductsService _productsService;

        public ProductsController(IProductsService productsService,
            ILogger<ProductsController> logger)
        {
            _productsService = productsService;
            _logger = logger;
        }

        [HttpGet]
        [Produces(typeof(ProductDto[]))]
        public async Task<IActionResult> Get()
        {
            _logger.LogInformation("Getting all products");
            var products = await _productsService.GetAll();

            return Ok(products);
        }

        [HttpGet("{id}")]
        [Produces(typeof(ProductDto))]
        public async Task<IActionResult> GetById(int id)
        {
            _logger.LogInformation("Getting product {ID}", id);
            var product = await _productsService.GetById(id);
            if (product == null)
            {
                throw new NotFoundCustomException("A product with id " + id + " was not found");
            }

            return Ok(product);
        }

        [HttpPost]
        [Produces(typeof(ProductDto))]
        public async Task<IActionResult> Post([FromBody] NewProductDto newProduct)
        {
            _logger.LogInformation("Posting product {}", newProduct);
            var createdProduct = await _productsService.Create(newProduct);

            return Created("product", createdProduct);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] NewProductDto newProduct)
        {
            _logger.LogInformation("Updating product {ID} with product {}", id, newProduct);
            await _productsService.Update(id, newProduct);

            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(int id, [FromBody] JsonPatchDocument<PatchProductDto> patch)
        {
            _logger.LogInformation("Patching product {ID} with information {PATCH}", id, patch);
            await _productsService.PartialUpdate(id, patch);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            _logger.LogInformation("Deleting product {ID}", id);
            await _productsService.Delete(id);

            return NoContent();
        }
    }
}