using AutoMapper;
using JwtUser.Core.DTOs.Request;
using JwtUser.Core.DTOs.Response;
using JwtUser.Core.Entities;
using JwtUser.Core.Services;
using JwtUser.Service.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace JwtUser.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationController : ControllerBase
    {
        private readonly IApplicationService _applicationService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;
        public ApplicationController(IApplicationService applicationService, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _applicationService = applicationService;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }


        [HttpGet]
        public IActionResult GetApplications()
        {
            return Ok(_applicationService.GetAllAsync());
        }    
        
        [HttpGet()]
        [Route("GetRelations")]
        public async  Task<IActionResult> GetApplicationsWithRelations(int id)
        {
            return Ok(await _applicationService.GetApplicationswithRelations(id));
        }

       

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddApplication(AddApplicationDto addApplicationDto)
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var application = _mapper.Map<Application>(addApplicationDto);

            application.CompanyId = userId;
            application.IsSuccess = false;
            application.Rate = null;
            application.TransportTime = DateTime.Now.AddDays(application.CompanyTransportTime);
            
            await _applicationService.AddAsync(application);

            return Ok("Data success add");
        }

       
        //[Authorize]
        [HttpPost]
        [Route("UpdateTest")]
        public  IActionResult UpdatApplication(int id, int rate)
        {

            var values =  _applicationService.Updaterating(id,rate);

            return Ok("Data success add");
        }

        [HttpGet]
        [Route("GetCompanyAverage")]
        public IActionResult GetCompanyAverage(string id)
        {
            return Ok(_applicationService.AverageRate(id));
        }

        [HttpGet]
        [Route("TransportCount")]
        public IActionResult GetTransportApplicationCount(int id)
        {
            return Ok(_applicationService.GetTransportApplicationCount(id));
        }
    }
}
