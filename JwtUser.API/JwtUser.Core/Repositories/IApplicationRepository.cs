using JwtUser.Core.DTOs.Response;
using JwtUser.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.Repositories
{
    public interface IApplicationRepository : IGenericRepository<Application>
    {

        public decimal Updaterating(int id, int rate);
        public decimal AverageRate(string id);

        public void ConfirmTransport(int id);

        public int GetTransportApplicationCount(int id);
        Task<List<Dictionary<string, object>>> GetApplicationsWithRATE(int id);
        Task<List<Application>> GetCompanyCarPersonel(string id);

    }
}
