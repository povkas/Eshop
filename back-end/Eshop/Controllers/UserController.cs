using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.DTOs.Products;
using Eshop.Models;
using Eshop.Services;
using Eshop.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Eshop.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IRegistrationService _service;
        private readonly ILoginService _loginService;
        private readonly ILogger _logger;        

        public UserController(IRegistrationService usersService, ILogger<UserController> logger, ILoginService loginService)
        {
            _service = usersService;
            _logger = logger;
            _loginService = loginService;
        }    
        
        [HttpPost]
        public async Task<ActionResult> Create([FromBody]User user)
        {
           if (await _service.CheckUserExistence(user))
           {
               var consumer =  await _service.CreateUser(user);
               return Ok(consumer);
           }
           return BadRequest("This email already exists");
        }

        [HttpGet("id")]
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
       
        [HttpPost("{login}")]
        public async Task<ActionResult> Login([FromBody] UserDto user)
        {
            if (!await _loginService.DoesUserExist(user))
                return BadRequest("Your username or password is incorrect.");
            return Ok(TokenManager.GenerateToken(user.Email));
        }

        [HttpGet("{validate}")]
        public async Task<ActionResult> Validate(string token, string email)
        {
            if (token != null && email != null)
            {
                string tokenEmail = await TokenManager.ValidateToken(token);
                if (email == tokenEmail)
                    return Ok();
            }
            return BadRequest();
        }
    }
}