using JwtUser.Repository.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace JwtUser.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class IsLoggedController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly AppDbContext _appDbContext;

        public IsLoggedController(IHttpContextAccessor httpContextAccessor, AppDbContext appDbContext)
        {
            _httpContextAccessor = httpContextAccessor;
            _appDbContext = appDbContext;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> IsLogged()
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var values = await _appDbContext.AppUsers.FindAsync(userId);
            return Ok(values.IsCompany);
        }
    }
}
