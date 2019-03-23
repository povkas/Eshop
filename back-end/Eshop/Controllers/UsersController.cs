using Eshop.DTOs.Products;
using Eshop.Models;
using Eshop.Services;
using Eshop.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Eshop.DTOs.Users;

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
        public async Task<ActionResult> Create([FromBody] NewUserDto newUser)
        {
            if (await _userService.CheckUserExistence(newUser))
            {
                var consumer = await _userService.CreateUser(newUser);
                return Created("user", consumer);
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
        public async Task<ActionResult> CreateJwtToken([FromBody] UserDto user)
        {
            if (!await _userService.CheckIfUserExists(user))
                return BadRequest("Incorrect username or password");
            return Created("jwt", TokenManager.GenerateToken(user.Email));
        }
    }
}