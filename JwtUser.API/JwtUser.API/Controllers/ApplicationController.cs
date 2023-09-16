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
            var values = await _applicationService.GetApplicationsWithRATE(id);
            return Ok(values);
        }


        [Authorize]
        [HttpDelete]
        [Route("DeleteApplication")]
        public async Task<IActionResult> DeleteApps(int id)
        {
            var values = await _applicationService.GetByIdAsync(id);
            _applicationService.Remove(values);
            return Ok("Data successfully removed !");
        }

       

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddApplication(AddApplicationDto addApplicationDto)
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            //var userName = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.Name).Value; 

            var application = _mapper.Map<Application>(addApplicationDto);

            application.CompanyId = userId;
            application.IsSuccess = false;
            application.Rate = null;
            application.TransportTime = DateTime.Now.AddDays(application.CompanyTransportTime);
            application.StatusId = 1;
            //application.CommentUser = userName;

            await _applicationService.AddAsync(application);

            if (addApplicationDto.PersonalIds != null && addApplicationDto.PersonalIds.Any())
            {
                var appPersonels = addApplicationDto.PersonalIds.Select(personalId => new AppPersonel
                {
                    ApplicationId = application.Id,
                    PersonalId = personalId
                }).ToList();

                await _appPersonelService.AddRangeAsync(appPersonels); 
            }

            return Ok("Data success add");
        }

       
        //[Authorize]
        [HttpPost]
        [Route("UpdateRate")]
        public  IActionResult UpdatApplication(int id, int rate)
        {

            _applicationService.Updaterating(id,rate);

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

        [HttpGet]
        [Route("ConfirmTransport")]
        public IActionResult ConfirmTransport(int id)
        {
            _applicationService.ConfirmTransport(id);
            return Ok("Transport successfully confirmed");
        }

        [Authorize]
        [HttpGet]
        [Route("GetCrew")]
        
        public async Task<IActionResult> GetCrew()
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            return Ok(await _applicationService.GetCompanyCarPersonel(userId)); 
        }


        [Authorize]
        [HttpGet]
        [Route("ApprovalApplication")]
        public async Task<IActionResult> GetApprovalApps()
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            return Ok(await _applicationService.GetMyApprovalApplication(userId));

        }

        [Authorize]
        [HttpGet]
        [Route("UserApprovalApplication")]
        public async Task<IActionResult> GetApprovalAppsForUser()
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            return Ok(await _applicationService.GetMyApprovalApplicationForUser(userId));

        }

        [Authorize]
        [HttpGet]
        [Route("UpdateStatus")]
        public IActionResult UpdateStatus(int id, int statusId)
        {
            _applicationService.UpdateStatus(id, statusId);
            return Ok("Successfully updated !");

        }


        [Authorize]
        [HttpPost]
        [Route("UpdateRates")]
        public async Task<IActionResult> UpdateComment(int appId, int rate, string comment, UpdateApplicationDto applicationDto)
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userName = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.Name).Value;

            var application = await _applicationService.GetByIdAsync(appId);

            application.Comment = comment;
            application.Rate = rate;
            application.CommentUser = userName;
            _applicationService.Update(application);
            return Ok("Data successfully updated");
            

        }
    }
}
