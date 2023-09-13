using JwtUser.Core.Entities;
using JwtUser.Core.Repositories;
using JwtUser.Repository.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Repository.Repositories
{
    public class MessageRepository : GenericRepository<Message>, IMessageRepository
    {
        public MessageRepository(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<object>> GetMessages(string userid, string companyid)
        {
            var messages = await _dbContext.Messages
                .Where(x => (x.FromId == userid && x.ToId == companyid) || (x.ToId == userid && x.FromId == companyid))
                .ToListAsync();

            var messageList = messages.Select(x => new
            {
                Text = x.Content,
                Date = x.Timestamp,
                FromId = x.FromId,
                ToId = x.ToId,
                // 'situation' alanını ekleyerek koşullara göre değer atayın
                Situation = x.FromId == userid ? "outgoing" : "incoming"
            }).ToList<object>();

            return messageList;
        }

        public async Task<List<Message>> GetMyMessages(string id)
        {
            return await _dbContext.Messages
                .Where(x => x.ToId == id)
                .Include(x => x.From)
                .GroupBy(x=>x.FromId)
                .Select(group=>group.OrderByDescending(x=>x.Timestamp).FirstOrDefault())
                .ToListAsync();
        }

        //public async Task<List<Message>> GetMessages(string userid, string companyid)
        //{
        //    return  await _dbContext.Messages.Where(x=>x.FromId==userid && x.ToId==companyid || x.ToId==userid && x.FromId==companyid).ToListAsync();
        //}
    }
}
