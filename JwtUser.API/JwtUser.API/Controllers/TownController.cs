using JwtUser.Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JwtUser.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TownController : ControllerBase
    {
        private readonly ITownService _townService;

        public TownController(ITownService townService)
        {
            _townService = townService;
        }

        [HttpGet]
        [Route("GetAllTowns")]
        public IActionResult GetTown() 
        {
            return Ok(_townService.GetAllAsync());
        }

        [HttpGet]
        public async Task<IActionResult> GetTownByCity(int id)
        {
            return Ok(await _townService.GetTownByCity(id)); 
        }
    }
}
