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
    public class HowCarryService : GenericService<HowCarry>, IHowCarryService
    {
        private readonly IHowCarryRepository _howCarryRepository;
        public HowCarryService(IGenericRepository<HowCarry> genericRepository, IUnitOfWork unitOfWork, IHowCarryRepository howCarryRepository) : base(genericRepository, unitOfWork)
        {
            _howCarryRepository = howCarryRepository;
        }
    }
}
