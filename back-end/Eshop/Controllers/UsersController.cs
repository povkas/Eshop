using Eshop.DTOs.Products;
using Eshop.Models;
using Eshop.Services;
using Eshop.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace Eshop.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly IUserService _userService;
        private readonly ILogger _logger;

        public UsersController(IUserService userService, ILogger<UsersController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody]User user)
        {
            if (await _userService.CheckUserExistence(user))
            {
                var consumer = await _userService.CreateUser(user);
                return Ok(consumer);
            }
            return BadRequest("This email already exists");
        }

        [HttpGet("{id}")]
        [Produces(typeof(User))]
        public async Task<IActionResult> GetById(int id)
        {
            _logger.LogInformation("Getting user's {ID}", id);
            var user = await _userService.GetById(id);
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
            if (!await _userService.CheckIfUserExists(user))
                return BadRequest("Incorrect username or password");
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