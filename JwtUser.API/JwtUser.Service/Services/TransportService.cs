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
    public class TransportService : GenericService<Transport>, ITransportService
    {
        private readonly ITransportRepository _transportRepository;

        public TransportService(IGenericRepository<Transport> genericRepository, IUnitOfWork unitOfWork, ITransportRepository transportRepository) : base(genericRepository, unitOfWork)
        {
            _transportRepository = transportRepository;
        }



        public async Task<List<Dictionary<string, object>>> GetTransportswithRelations()
        {
            return await _transportRepository.GetTransportswithRelations();
        }

        public async Task<List<Dictionary<string, object>>> GetUserTransportList(string id)
        {
            return await _transportRepository.GetUserTransportList(id);
        }
    }    
}
