using JwtUser.Core.DTOs.Response;
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
    public class ApplicationService : GenericService<Application>, IApplicationService
    {
        private readonly IApplicationRepository _applicationRepository;

        public ApplicationService(IGenericRepository<Application> genericRepository, IUnitOfWork unitOfWork, IApplicationRepository applicationRepository) : base(genericRepository, unitOfWork)
        {
            _applicationRepository = applicationRepository;
        }

        public decimal AverageRate(string id)
        {
            return _applicationRepository.AverageRate(id);
        }

        public void ConfirmTransport(int id)
        {
            _applicationRepository.ConfirmTransport(id);
        }

        public async Task<List<Dictionary<string, object>>> GetApplicationsWithRATE(int id)
        {
            return await _applicationRepository.GetApplicationsWithRATE(id);
        }

        public async Task<List<Application>> GetCompanyCarPersonel(string id)
        {
            return await _applicationRepository.GetCompanyCarPersonel(id);
        }

        public async Task<List<Application>> GetMyApprovalApplication(string id)
        {
            return await _applicationRepository.GetMyApprovalApplication(id);
        }

        public async Task<List<Application>> GetMyApprovalApplicationForUser(string id)
        {
            return await _applicationRepository.GetMyApprovalApplicationForUser(id);
        }

        public int GetTransportApplicationCount(int id)
        {
            return _applicationRepository.GetTransportApplicationCount(id);
        }

        public decimal Updaterating(int id, int rate)
        {
                return _applicationRepository.Updaterating(id, rate);
        }

        public void UpdateStatus(int id, int statusId)
        {
            _applicationRepository.UpdateStatus(id, statusId);
        }
    }
}
