using System.Threading.Tasks;
using Eshop.DTOs;
using Eshop.Services;
using Eshop.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Eshop.Controllers
{
    [Route("api/productCategories")]
    public class ProductCategoriesController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly IProductCategoriesService _service;

        ProductCategoriesController(IProductCategoriesService service,
            ILogger<ProductCategoriesController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        [Produces(typeof(ProductCategoryDto[]))]
        public async Task<IActionResult> Get()
        {
            _logger.LogInformation("Getting all product categories");
            var productCategories = await _service.GetAll();

            return Ok(productCategories);
        }
    }
}