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
    public class CityService : GenericService<City>, ICityService
    {
        private readonly ICityRepository _cityRepository;

        public CityService(IGenericRepository<City> genericRepository, IUnitOfWork unitOfWork, ICityRepository cityRepository) : base(genericRepository, unitOfWork)
        {
            _cityRepository = cityRepository;
        }
    }
}
