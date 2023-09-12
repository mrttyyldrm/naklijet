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
    public class TransportRepository : GenericRepository<Transport>, ITransportRepository
    {
        public TransportRepository(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Transport>> GetTransportswithRelations()
        {
            return await _dbContext.Transports
                .Include(x => x.HowCarries)
                .Include(x => x.AppUser)
                .Include(x => x.Category)
                .Include(x => x.ToStreet).ThenInclude(x=>x.Towns).ThenInclude(x=>x.City)
                .Include(x => x.Street).ThenInclude(x => x.Towns).ThenInclude(x => x.City)
                .Include(x => x.Street).ToListAsync();
        }

        public async Task<List<Transport>> GetUserTransportList(string id)
        {
            return await _dbContext.Transports
                .Where(x => x.AppUserId == id)
                .Include(x => x.HowCarries)                
                .Include(x => x.Category)
                .Include(x => x.AppUser)
                .Include(x => x.ToStreet).ThenInclude(x => x.Towns).ThenInclude(x => x.City)
                .Include(x => x.Street).ThenInclude(x => x.Towns).ThenInclude(x => x.City)
                .Include(x => x.Street).ToListAsync();
        }
    }
}
