using AutoMapper;
using JwtUser.Core.DTOs.Request;
using JwtUser.Core.DTOs.Response;
using JwtUser.Core.Entities;
using JwtUser.Core.Services;
using JwtUser.Repository.Context;
using JwtUser.Service.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace JwtUser.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ApplicationController : ControllerBase
    {
        private readonly IApplicationService _applicationService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;
        private readonly AppDbContext _appDbContext;
        private readonly IAppPersonelService _appPersonelService;
        public ApplicationController(IApplicationService applicationService, IMapper mapper, IHttpContextAccessor httpContextAccessor, AppDbContext appDbContext, IAppPersonelService appPersonelService)
        {
            _applicationService = applicationService;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
            _appDbContext = appDbContext;
            _appPersonelService = appPersonelService;
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
            var values = await _applicationService.GetApplicationswithRelations(id);
            return Ok(values);
        }


       

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddApplication(AddApplicationDto addApplicationDto)
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var application = _mapper.Map<Application>(addApplicationDto);

            application.CompanyId = userId;
            application.IsSuccess = false;
            application.Rate = null;
            application.TransportTime = DateTime.Now.AddDays(application.CompanyTransportTime);

            await _applicationService.AddAsync(application);

            // Burada PersonalId'leri toplu olarak ekleyebilirsiniz.
            if (addApplicationDto.PersonalIds != null && addApplicationDto.PersonalIds.Any())
            {
                var appPersonels = addApplicationDto.PersonalIds.Select(personalId => new AppPersonel
                {
                    ApplicationId = application.Id,
                    PersonalId = personalId
                }).ToList();

                await _appPersonelService.AddRangeAsync(appPersonels); // Servisinizde toplu ekleme işlemini desteklemelisiniz.
            }

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
