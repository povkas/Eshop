using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Models;
using Eshop.Services;
using Eshop.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Eshop.Controllers
{
    [Route("api/registration")]
    [ApiController]
    public class RegistrationController : Controller
    {
        private readonly IRegistrationService _service;
        private readonly ILogger _logger;        

        public RegistrationController(IRegistrationService usersService, ILogger<RegistrationController> logger)
        {
            _service = usersService;
            _logger = logger;
        }      
        [HttpPost]
        public async Task<ActionResult> Create([FromBody]User user)
        {
           if (await _service.CheckUserExistence(user))
           {
               var consumer =  await _service.CreateUser(user);
               return Ok(consumer);
           }
           return BadRequest("The user email is already exist");
        }
        [HttpGet("{id}")]
        [Produces(typeof(User))]
        public async Task<IActionResult> GetById(int id)
        {
            _logger.LogInformation("Getting user's {ID}", id);
            var user = await _service.GetById(id);
            if (user == null)
            {
                _logger.LogWarning("GetById({ID}) NOT FOUND", id);
                return NotFound();
            }

            return Ok(user);
        }
    }
}