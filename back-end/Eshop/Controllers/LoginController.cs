using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Eshop.Models;
using Eshop.Data;
using Eshop.Services;
using System.Net;
using System.Net.Http;
using Ehop.Data.Repositories;
//using System.Web.Http;

namespace Eshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _service;

        public LoginController(ILoginService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult> Login([FromBody]User user)
        {
            User u = await _service.UserExist(user.Email);
            if (u == null) 
                return BadRequest("The user was not found.");
            bool credentials = u.Password.Equals(user.Password);
            if (!credentials) return BadRequest("The username/password combination was wrong.");
            return Ok(TokenManager.GenerateToken(user.Email));
        }


        [HttpGet]
        public async Task<ActionResult> Validate(string token, string email)
        {
            if (await _service.UserExist(email) == null)
                return BadRequest("The user was not found.");
            string tokenUsername = TokenManager.ValidateToken(token);
            if (email.Equals(tokenUsername))
                return Ok();
            return BadRequest();
        }
    }
    
}