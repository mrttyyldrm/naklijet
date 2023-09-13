using JwtUser.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.Services
{
    public interface IMessageService : IGenericService<Message>
    {
        //Task<List<Message>> GetMessages(string userid, string companyid);
        Task<List<object>> GetMessages(string userid, string companyid);
        Task<List<Message>> GetMyMessages(string id);

    }
}
