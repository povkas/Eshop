using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Eshop.Models;
using Eshop.Data;
using System.Net;
using System.Net.Http;
//using System.Web.Http;

namespace Eshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
         [HttpPost]
        public IActionResult Login(User user)
          {
            User u = SeedData.UserExists(user.Email);
            if (u == null)
                return BadRequest("The user was not found.");
            bool credentials = u.Password.Equals(user.Password);
            if (!credentials) return BadRequest("The username/password combination was wrong.");
                return Ok(TokenManager.GenerateToken(user.Email));
          }

        [HttpGet]
        public IActionResult Validate(string token, string email)
          {       
            bool exists = SeedData.UserExists(email) != null;
            if (!exists)
                return BadRequest("The user was not found.");
            string tokenUsername = TokenManager.ValidateToken(token);
            if (email.Equals(tokenUsername))
                return Ok();
            return BadRequest();
          }
    }
}