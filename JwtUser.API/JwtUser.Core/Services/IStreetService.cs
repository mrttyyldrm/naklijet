using JwtUser.Core.Entities;
using JwtUser.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.Services
{
    public interface IStreetService : IGenericService<Street>
    {
        Task<List<Street>> GetStreetByTown(int id);

    }
}
