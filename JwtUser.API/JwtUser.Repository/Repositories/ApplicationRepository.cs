using JwtUser.Core.DTOs.Response;
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
    public class ApplicationRepository : GenericRepository<Application>, IApplicationRepository
    {
        public ApplicationRepository(AppDbContext dbContext) : base(dbContext)
        {
        }

        public decimal AverageRate(string id)
        {
            var count = _dbContext.Applications.Where(x => x.IsSuccess == true && x.Rate != null && x.CompanyId == id).Count();
            return (decimal)_dbContext.Applications.Where(x => x.IsSuccess == true && x.Rate != null && x.CompanyId==id).Sum(x => x.Rate)/count;
        }

        public async Task<List<Application>> GetApplicationswithRelations(int id)
        {
            return await _dbContext.Applications.Where(x => x.TransportId == id).Include(x => x.Transports).ThenInclude(x => x.Category)
                 .Include(x => x.Transports)
                    .ThenInclude(x => x.ToStreet).ThenInclude(x=>x.Towns).ThenInclude(x=>x.City)
                     .Include(x => x.Transports).ThenInclude(x => x.Street).ThenInclude(x => x.Towns).ThenInclude(x => x.City)
                .Include(x => x.Transports)
                    .ThenInclude(x => x.HowCarries)
                .Include(x => x.Company)
                .Include(x => x.Cars)
                .Include(x => x.AppPersonels)
                    .ThenInclude(x => x.Personals)
                .ToListAsync();

            //var applications = await _dbContext.Applications
            //        .FromSqlInterpolated($"exec apppersoneldata{id}")
            //        .ToListAsync();

            //return applications;
        }


        public int GetTransportApplicationCount(int id)
        {
            return _dbContext.Applications.Where(x => x.TransportId == id).Count();
        }

        public decimal Updaterating(int id, int rate)
        {
            var application = _dbContext.Applications.FirstOrDefault(x => x.Id == id);
            
                application.Rate = rate; // Price alanını rate ile güncelle
                _dbContext.SaveChanges(); // Değişiklikleri kaydet
                return (decimal)application.Rate; // Güncellenen Price değerini geri dön
            
        }
    }
}
