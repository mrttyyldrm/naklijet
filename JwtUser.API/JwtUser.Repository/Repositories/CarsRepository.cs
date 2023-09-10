using JwtUser.Core.Entities;
using JwtUser.Core.Repositories;
using JwtUser.Repository.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Repository.Repositories
{
    public class CarsRepository : GenericRepository<Cars>, ICarsRepository
    {
        public CarsRepository(AppDbContext dbContext) : base(dbContext)
        {
        }
    }
}
