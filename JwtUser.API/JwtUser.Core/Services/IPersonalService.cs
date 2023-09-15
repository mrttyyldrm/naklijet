using JwtUser.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.Services
{
    public interface IPersonalService : IGenericService<Personal>
    {
        Task<List<Dictionary<string, object>>> GetCompanyCarPersonel(string id);

    }
}
