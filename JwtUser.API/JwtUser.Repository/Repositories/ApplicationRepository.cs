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
            var rate = (decimal)_dbContext.Applications.Where(x => x.IsSuccess == true && x.Rate != null && x.CompanyId == id).Sum(x => x.Rate) / count;
            return rate;
        }

        public async Task<List<Dictionary<string, object>>> GetApplicationsWithRATE(int id)
        {
            var applications = await _dbContext.Applications
         .Where(x => x.TransportId == id)
         .Include(x => x.Company)
         .Include(x => x.Cars)
         .Include(x => x.AppPersonels)
             .ThenInclude(x => x.Personals)
                 .ThenInclude(x => x.Appellation)
         .ToListAsync();



            var results = new List<Dictionary<string, object>>();

            foreach (var application in applications)
            {
                string compId = application.CompanyId;
                decimal rate = CalculateRate(compId); 

                
                var matchingApplications = _dbContext.Applications
                    .Where(x => x.CompanyId == compId)
                    .Select(x => new { x.Comment, x.CommentUser,x.Rate })
                    .ToList();

                var result = new Dictionary<string, object>
                {
                    { "application", application },
                    { "rate", rate },
                    { "comments", matchingApplications }
                };

                results.Add(result);
            }

            return results;
        }

        private decimal CalculateRate(string companyId)
        {
            var count = _dbContext.Applications
                .Where(x => x.IsSuccess == true && x.Rate != null && x.CompanyId == companyId)
                .Count();

            var rateSum = _dbContext.Applications
                .Where(x => x.IsSuccess == true && x.Rate != null && x.CompanyId == companyId)
                .Sum(x => x.Rate);

            var rate = count > 0 ? Math.Floor((decimal)rateSum / count * 10) / 10 : 0;

            return rate;
        }



        public int GetTransportApplicationCount(int id)
        {
            return _dbContext.Applications.Where(x => x.TransportId == id).Count();
        }

        public decimal Updaterating(int id, int rate)
        {
            var application = _dbContext.Applications.FirstOrDefault(x => x.Id == id);

            application!.Rate = rate;
            _dbContext.SaveChanges();
            return (decimal)application.Rate;

        }

        public void ConfirmTransport(int id)
        {
            var application = _dbContext.Applications.FirstOrDefault(x => x.Id == id);
            application!.IsSuccess = true;
            _dbContext.SaveChanges();
        }

        public async Task<List<Application>> GetCompanyCarPersonel(string id)
        {
            return await _dbContext.Applications
                .Where(x => x.CompanyId == id)
                .Include(x => x.Cars)
                .Include(x => x.AppPersonels)
                    .ThenInclude(x => x.Personals).ThenInclude(x => x.Appellation)
                .ToListAsync();
        }

        public async Task<List<Application>> GetMyApprovalApplication(string id)
        {
            var applications = await _dbContext.Applications
           .Where(x => x.CompanyId == id && x.IsSuccess == true)
           .Include(x => x.Transports.AppUser)
           .Include(x => x.Transports.Street.Towns.City)
           .Include(x => x.Transports.ToStreet.Towns.City)
           .Include(x => x.Transports.Category)
           .Include(x => x.Cars)
           .Include(x => x.Statuses)
           .Include(x => x.AppPersonels)
               .ThenInclude(x => x.Personals)
                   .ThenInclude(x => x.Appellation)
           .ToListAsync();


            return applications;
        }

        public void UpdateStatus(int id, int statusId)
        {
            var application = _dbContext.Applications.FirstOrDefault(x => x.Id == id);
            application!.StatusId = statusId;
            _dbContext.SaveChanges();
        }

        public async Task<List<Application>> GetMyApprovalApplicationForUser(string id)
        {
            var applications = await _dbContext.Applications
                         .Where(x => x.Transports.AppUserId == id && x.IsSuccess == true)
                         .Include(x => x.Transports.Street.Towns.City)
                         .Include(x => x.Transports.ToStreet.Towns.City)
                         .Include(x => x.Transports.Category)
                         .Include(x => x.Cars)
                         .Include(x => x.Company)
                         .Include(x => x.Statuses)
                         .Include(x => x.AppPersonels)
                             .ThenInclude(x => x.Personals)
                                 .ThenInclude(x => x.Appellation)
                         .ToListAsync();


            return applications;
        }
    }
}
