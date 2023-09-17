using AutoMapper;
using JwtUser.Core.DTOs.Request;
using JwtUser.Core.Entities;
using JwtUser.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration.UserSecrets;
using System.Security.Claims;

namespace JwtUser.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService _messageService;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public MessageController(IMessageService messageService, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _messageService = messageService;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage(AddMessageDto messageDto)
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            messageDto.FromId = userId;
            messageDto.Timestamp= DateTime.UtcNow.AddHours(3);
            var message = _mapper.Map<Message>(messageDto);
            await _messageService.AddAsync(message);
            return Ok("Data add succeeded");
        }

        [HttpGet]
        public async Task<IActionResult> GetMessages(string comid)
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var values = await _messageService.GetMessages(userId!,comid);
            return Ok(values);
        }

        [HttpGet]
        [Route("GetMyMessage")]
        public async Task<IActionResult> GetMyMessages()
        {
            var userId = _httpContextAccessor.HttpContext!.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var values = await _messageService.GetMyMessages(userId!);

            return Ok(values);
        }
    }
}
