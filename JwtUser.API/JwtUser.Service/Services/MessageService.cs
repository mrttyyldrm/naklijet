using JwtUser.Core.Entities;
using JwtUser.Core.Repositories;
using JwtUser.Core.Services;
using JwtUser.Core.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Service.Services
{
    public class MessageService : GenericService<Message>, IMessageService
    {
        private readonly IMessageRepository _messageRepository;
        public MessageService(IGenericRepository<Message> genericRepository, IUnitOfWork unitOfWork, IMessageRepository messageRepository) : base(genericRepository, unitOfWork)
        {
            _messageRepository = messageRepository;
        }

        public async Task<List<object>> GetMessages(string userid, string companyid)
        {
            return await _messageRepository.GetMessages(userid, companyid);
        }

        public async Task<List<Message>> GetMyMessages(string id)
        {
            return await _messageRepository.GetMyMessages(id);
        }

        //public async Task<List<Message>> GetMessages(string userid, string companyid)
        //{
        //    return await _messageRepository.GetMessages(userid, companyid);
        //}
    }
}
