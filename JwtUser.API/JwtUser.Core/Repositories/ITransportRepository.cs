﻿using JwtUser.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.Repositories
{
    public interface ITransportRepository : IGenericRepository<Transport>
    {

        Task<List<Transport>> GetTransportswithRelations();
        Task<List<Transport>> GetUserTransportList(string id);

    }
}