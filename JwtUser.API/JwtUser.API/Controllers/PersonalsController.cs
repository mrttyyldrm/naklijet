using AutoMapper;
using JwtUser.Core.DTOs.Request;
using JwtUser.Core.DTOs.Response;
using JwtUser.Core.Entities;
using JwtUser.Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace JwtUser.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonalsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IPersonalService _personalService;
        public PersonalsController(IMapper mapper, IPersonalService personalService, IHttpContextAccessor httpContextAccessor)
        {
            _mapper = mapper;
            _personalService = personalService;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        public IActionResult GetPersonal()
        {
            var result = _personalService.GetAllAsync();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePersonal([FromBody] AddPersonelDto addPersonalDto)
        {

            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;


            var personal = _mapper.Map<Personal>(addPersonalDto);
            personal.CompanyId = userId;


            await _personalService.AddAsync(personal);

            return Ok("Data successfully added !");
        }

        [HttpPut]
        public IActionResult UpdatePersonal(PersonalDto personalDto)
        {
            var updatePersonal = _mapper.Map<Personal>(personalDto);

            _personalService.Update(updatePersonal);

            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeletePersonal(int id)
        {
            var hasPpersonal = await _personalService.GetByIdAsync(id);

             _personalService.Remove(hasPpersonal);

            return Ok();
        }
    }
}
