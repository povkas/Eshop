using Eshop.DTOs.Users;
using Eshop.ExceptionHandling;
using Eshop.Models;
using Eshop.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.JsonWebTokens;
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
        [Produces(typeof(NewUserDto))]
        public async Task<ActionResult> Create([FromBody] NewUserDto newUser)
        {

            if (!await _userService.CheckUserExistence(newUser))
            {
                throw new FailedToCreateUserException("This email is already taken");
            }

            var user = await _userService.CreateUser(newUser);
            return Created("user", user);
        }

        [HttpDelete("{email}")]
        [Produces(typeof(NewUserDto))]
        public async Task<ActionResult> Delete(string email)
        {
            var user = await _userService.Delete(email);
            if (!user)
            {
                throw new FailedToCreateUserException("Such user dosen`t exist");
            }
            return Ok(user);
        }

        [HttpGet("{id}")]
        [Produces(typeof(UserDto))]
        public async Task<IActionResult> GetById(int id)
        {
            _logger.LogInformation("Getting user's {ID}", id);
            var user = await _userService.GetById(id);
            if (user == null)
            {
                throw new NotFoundCustomException("User with id " + id + " was not found");
            }

            return Ok(user);
        }

        [HttpGet]
        [Produces(typeof(UserDto[]))]
        public async Task<IActionResult> Get()
        {
            _logger.LogInformation("Getting all users");
            var allUsers = await _userService.GetAll();

            return Ok(allUsers);
        }

        [HttpGet("{email}")]
        [Produces(typeof(UserDto))]
        public async Task<IActionResult> GetByEmail(string email)
        {
            _logger.LogInformation("Getting user's {ID}", email);
            var user = await _userService.GetByEmail(email);
            if (user == null)
            {
                throw new NotFoundCustomException("User with email " + email + " was not found");
            }

            return Ok(user);
        }

        [HttpPost("{login}")]
        [Produces(typeof(JsonWebToken))]
        public async Task<ActionResult> CreateJwtToken([FromBody] LoginRequestDto user)
        {
            string userRole = await _userService.CheckCredentials(user);
            if (userRole == null)
            {
                throw new InvalidCredentialsException("Incorrect email or password");
            }

            return Created("jwt", TokenManager.GenerateToken(user.Email, userRole));
        }
    }
}