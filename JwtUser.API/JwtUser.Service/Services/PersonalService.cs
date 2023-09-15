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
    public class PersonalService : GenericService<Personal>, IPersonalService
    {
        private readonly IPersonalRepository _personalRepository;
        public PersonalService(IGenericRepository<Personal> genericRepository, IUnitOfWork unitOfWork, IPersonalRepository personalRepository) : base(genericRepository, unitOfWork)
        {
            _personalRepository = personalRepository;
        }

        public async Task<List<Dictionary<string, object>>> GetCompanyCarPersonel(string id)
        {
            return await _personalRepository.GetCompanyCarPersonel(id);
        }
    }
}
