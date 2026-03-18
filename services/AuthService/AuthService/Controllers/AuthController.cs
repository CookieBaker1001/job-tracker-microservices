using AuthService.Data;
using AuthService.Models;
using AuthService.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthService.Controllers
{
    //[Route("api/[controller]")]
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthDbContext _context;
        private readonly JwtService _jwtService;

        public AuthController(AuthDbContext context, JwtService jwtService) {
            _context = context;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(string email, string password) {
            var user = new User
            {
                Email = email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request) { 
            var user = _context.Users.FirstOrDefault(u => u.Email == request.Email);

            if (user == null) return Unauthorized();
            
            var validPassword = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);

            if (!validPassword) return Unauthorized();

            var token = _jwtService.GenerateToken(user);

            return Ok(new { token });
        }

        [Authorize]
        [HttpGet("amiloggedin")]
        public IActionResult AmILoggedIn()
        {
            return Ok("You are logged in!");
        }

        [HttpGet("test")]
        public IActionResult Test() {
            return Ok("[AuthService]: This endpoint works!");
        }
    }
}
