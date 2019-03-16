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
        private readonly IProductCategoriesService _service;
        //private readonly ILogger _logger;

        ProductCategoriesController(IProductCategoriesService service)
        {

        }

        [HttpGet]
        [Produces(typeof(ProductCategoryDto[]))]
        public async Task<IActionResult> Get()
        {
            var productCategories = await _service.GetAll();

            return Ok(productCategories);
        }
    }
}