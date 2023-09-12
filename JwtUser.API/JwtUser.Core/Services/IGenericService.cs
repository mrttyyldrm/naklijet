using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.Services
{
    public interface IGenericService<T> where T : class 
    {
        Task AddAsync(T t);

        IEnumerable<T> GetAllAsync();
        IQueryable<T> GetListByFilter(Expression<Func<T, bool>> expression);
        Task AddRangeAsync(IEnumerable<T> entities);

        Task<T> GetByIdAsync(int id);

        void Remove(T t);

        void Update(T entity);
    }
}
