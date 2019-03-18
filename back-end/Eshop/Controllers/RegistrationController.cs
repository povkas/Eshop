using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Models;
using Eshop.Services;
using Eshop.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Eshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : Controller
    {
        private readonly IRegistrationService _service;

        public RegistrationController(IRegistrationService service)
        {
            _service = service;
        }
        [HttpPost]
        public async Task<ActionResult> Create([FromBody]User user)
        {
           if (await _service.CheckUserExistence(user))
           {
               await _service.CreateUser(user);
               return Created("Index", user);
           }
           return BadRequest("The user email is already exist");
        }
    }
}