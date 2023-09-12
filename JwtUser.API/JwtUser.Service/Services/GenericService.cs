using JwtUser.Core.Repositories;
using JwtUser.Core.Services;
using JwtUser.Core.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Service.Services
{
    public class GenericService<T> : IGenericService<T> where T : class
    {
        private readonly IGenericRepository<T> _genericRepository;
        private readonly IUnitOfWork _unitOfWork;

        public GenericService(IGenericRepository<T> genericRepository, IUnitOfWork unitOfWork)
        {
            _genericRepository = genericRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task AddAsync(T t)
        {
            await _genericRepository.AddAsync(t);
            await _unitOfWork.CommitAsync();
        }

        public Task AddRangeAsync(IEnumerable<T> entities)
        {
            return _genericRepository.AddRangeAsync(entities);
        }

        public IEnumerable<T> GetAllAsync()
        {
            return _genericRepository.GetAllAsync();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _genericRepository.GetByIdAsync(id);
        }

        public IQueryable<T> GetListByFilter(Expression<Func<T, bool>> expression)
        {
            return _genericRepository.GetListByFilter(expression);
        }

        public void Remove(T t)
        {
            _genericRepository.Remove(t);
            _unitOfWork.Commit();
        }

        public void Update(T entity)
        {
            _genericRepository.Update(entity);
            _unitOfWork.Commit();
        }
    }
}
