using JwtUser.Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JwtUser.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HowCarryController : ControllerBase
    {
        private readonly IHowCarryService _howCarryService;

        public HowCarryController(IHowCarryService howCarryService)
        {
            _howCarryService = howCarryService;
        }

        [HttpGet]
        public IActionResult GetHowCarry()
        {
            return Ok(_howCarryService.GetAllAsync());
        }
    }
}
