using AutoMapper;
using JwtUser.Core.DTOs.Response;
using JwtUser.Core.Entities;
using JwtUser.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace JwtUser.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly ICarsService _carsService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;
        public CarsController(ICarsService carsService, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _carsService = carsService;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        public IActionResult GetCars()
        {
            return Ok(_carsService.GetAllAsync());
        }


        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateCars([FromBody]CarsDto carsDto)
        {

            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var cars = _mapper.Map<Cars>(carsDto);

            cars.CompanyId = userId;

            await _carsService.AddAsync(cars);

            return Ok("Data successfull Add");
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteCars(int id)
        {
            var hasCars = await _carsService.GetByIdAsync(id);

            if (hasCars == null)
                return NoContent();

            _carsService.Remove(hasCars);

            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateCars(CarsDto carsDto)
        {
            var updateCars = _mapper.Map<Cars>(carsDto);

            _carsService.Update(updateCars);

            return Ok();
        }
    }
}
