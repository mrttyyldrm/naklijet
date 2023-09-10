using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.Repositories
{
    public interface IGenericRepository<T> where T : class
    {
        Task AddAsync(T entity);
        IQueryable<T> GetAllAsync();
        IQueryable<T> GetListByFilter(Expression<Func<T, bool>> expression);

        Task<T> GetByIdAsync(int id);

        void Remove(T t);

        void Update(T t);
    }
}

