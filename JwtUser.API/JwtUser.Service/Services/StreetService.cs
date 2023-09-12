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
    public class StreetService : GenericService<Street>, IStreetService
    {
        private readonly IStreetRepository _streetRepository;

        public StreetService(IGenericRepository<Street> genericRepository, IUnitOfWork unitOfWork, IStreetRepository streetRepository) : base(genericRepository, unitOfWork)
        {
            _streetRepository = streetRepository;
        }

        public async Task<List<Street>> GetStreetByTown(int id)
        {
            return await _streetRepository.GetStreetByTown(id);
        }
    }
}
