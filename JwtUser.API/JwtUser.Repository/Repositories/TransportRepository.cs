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

        public async Task<List<Dictionary<string, object>>> GetTransportswithRelations()
        {
            var values = await _dbContext.Transports
                .Where(x=>x.isShow==true)
                .Include(x => x.HowCarries)
                .Include(x => x.AppUser)
                .Include(x => x.Category)
                .Include(x => x.ToStreet).ThenInclude(x => x.Towns).ThenInclude(x => x.City)
                .Include(x => x.Street).ThenInclude(x => x.Towns).ThenInclude(x => x.City)
                .Include(x => x.Street).ToListAsync();


            var results = new List<Dictionary<string, object>>();

            foreach (var transport in values)
            {
                int transportId = transport.Id;
                int getOffers = _dbContext.Applications.Where(x => x.TransportId == transportId).Count();

                var result = new Dictionary<string, object>
                {
                     { "transport", transport },
                     { "offers", getOffers }
                };

                results.Add(result);
            }

            return results;

        }

        public async Task<List<Dictionary<string, object>>> GetUserTransportList(string id)
        {
            var values = await _dbContext.Transports
                .Where(x => x.AppUserId == id)
                .Include(x => x.HowCarries)
                .Include(x => x.Category)
                .Include(x => x.AppUser)
                .Include(x => x.ToStreet).ThenInclude(x => x.Towns).ThenInclude(x => x.City)
                .Include(x => x.Street).ThenInclude(x => x.Towns).ThenInclude(x => x.City)
                .Include(x => x.Street).ToListAsync();


            var results = new List<Dictionary<string, object>>();

            foreach (var transport in values)
            {
                int transportId = transport.Id;
                int getOffers = _dbContext.Applications.Where(x => x.TransportId == transportId).Count();

                var result = new Dictionary<string, object>
                {
                     { "Transport", transport },
                     { "offers", getOffers }
                };

                results.Add(result);
            }

            return results;

        }
    }
}
