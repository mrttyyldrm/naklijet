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
    public class AppPersonelService : GenericService<AppPersonel>, IAppPersonelService
    {
        private readonly IAppPersonelRepository _personelRepository;
        public AppPersonelService(IGenericRepository<AppPersonel> genericRepository, IUnitOfWork unitOfWork, IAppPersonelRepository personelRepository) : base(genericRepository, unitOfWork)
        {
            _personelRepository = personelRepository;
        }
    }
}
