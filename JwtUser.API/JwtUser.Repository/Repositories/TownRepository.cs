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
    public class TownRepository : GenericRepository<Town>, ITownRepository
    {
        public TownRepository(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Town>> GetTownByCity(int id)
        {
            return await _dbContext.Towns.Where(x => x.CityId == id).ToListAsync();
        }
    }
}
