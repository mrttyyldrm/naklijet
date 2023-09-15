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
    public class PersonalRepository : GenericRepository<Personal>, IPersonalRepository
    {
        public PersonalRepository(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Dictionary<string, object>>> GetCompanyCarPersonel(string id)
        {
            var personal = await _dbContext.Personals.Where(x => x.CompanyId == id).Include(x => x.Appellation).ToListAsync();

            var cars = await _dbContext.Cars.Where(x => x.CompanyId == id).ToListAsync();

            var combinedData = new List<Dictionary<string, object>>();

           

                var data = new Dictionary<string, object>
                    {
                        { "Personal", personal },
                        { "Car", cars }
                    };

                combinedData.Add(data);           

            return combinedData;
        }
    }
}
