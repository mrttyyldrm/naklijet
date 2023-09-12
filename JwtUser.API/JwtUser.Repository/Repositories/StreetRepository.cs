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
    public class StreetRepository : GenericRepository<Street>, IStreetRepository
    {
        public StreetRepository(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Street>> GetStreetByTown(int id)
        {
            return await _dbContext.Streets.Where(x => x.TownId == id).ToListAsync();
        }
    }
}
