using JwtUser.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.Repositories
{
    public interface IStreetRepository : IGenericRepository<Street>
    {
        Task<List<Street>> GetStreetByTown(int id);

    }
}
