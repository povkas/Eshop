using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Eshop.Models;
using Eshop.Services;
using Eshop.DTOs.Products;


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
        public async Task<ActionResult> Login([FromBody] UserDto user)
        {

            //var result = await _service.DoesUserExist(user);
            if (await _service.DoesUserExist(user))
                return BadRequest("Your username or password is incorrect.");       
               return Ok(TokenManager.GenerateToken(user.Email));          
        }


        [HttpGet]
        public async Task<ActionResult> Validate(string token, string email)
        { 
            if(token != null && email != null)
            {
                string tokenEmail = await TokenManager.ValidateToken(token);
                if (email == tokenEmail)
                    return Ok();
            }         
            return BadRequest();
        }


    }
    
}