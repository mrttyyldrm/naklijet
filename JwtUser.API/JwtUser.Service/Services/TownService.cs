using JwtUser.Core.Entities;
using JwtUser.Core.Repositories;
using JwtUser.Core.Services;
using JwtUser.Core.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Service.Services
{
    public class TownService : GenericService<Town>, ITownService
    {
        private readonly ITownRepository _townRepository;

        public TownService(IGenericRepository<Town> genericRepository, IUnitOfWork unitOfWork, ITownRepository townRepository) : base(genericRepository, unitOfWork)
        {
            _townRepository = townRepository;
        }

        public async Task<List<Town>> GetTownByCity(int id)
        {
            return await _townRepository.GetTownByCity(id);
        }
    }
}
