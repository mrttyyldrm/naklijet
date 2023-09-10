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
    public class CarsService : GenericService<Cars>, ICarsService
    {

        private readonly ICarsRepository _carsRepository;
        public CarsService(IGenericRepository<Cars> genericRepository, IUnitOfWork unitOfWork, ICarsRepository carsRepository) : base(genericRepository, unitOfWork)
        {
            _carsRepository = carsRepository;
        }
    }
}
