using AutoMapper;
using JwtUser.Core.DTOs.Request;
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
    public class TransportController : ControllerBase
    {
        private readonly ITransportService _transportService;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;
        

        public TransportController(ITransportService transportService, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _transportService = transportService;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }


        [HttpGet]

        public IActionResult GetListTransports()
        {
            var values =  _transportService.GetAllAsync();            
            return Ok(values);            
        }

        [HttpGet]
        [Route("GetListTransportsTest")]
        public async Task<IActionResult> GetListTransportsTest()
        {
            var values = await _transportService.GetTransportswithRelations();
            return Ok(values);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddTransport(AddTransportDto transportDto)
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var transport = _mapper.Map<Transport>(transportDto);

            transport.AppUserId = userId;

            await _transportService.AddAsync(transport);
            return Ok("Data success add");
        }


        [Authorize]
        [HttpGet]
        [Route("GetList")]
        public async Task<IActionResult> GetMyTransportList()
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var values = await _transportService.GetUserTransportList(userId);
            return Ok(values);

        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveTransport(int id)
        {
            var values = await _transportService.GetByIdAsync(id);
            _transportService.Remove(values);
            return Ok("Successfully Removed !");
        }

    }
}
