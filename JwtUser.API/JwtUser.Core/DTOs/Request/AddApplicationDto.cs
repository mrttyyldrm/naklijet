using JwtUser.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.DTOs.Request
{
    public class AddApplicationDto
    {
        public string? CompanyId { get; set; }

        public decimal Price { get; set; }
        public DateTime TransportTime { get; set; }


        public int TransportId { get; set; }
        public int CarsId { get; set; }
        public int CompanyTransportTime { get; set; }

        public bool IsSuccess { get; set; }
        public List<int> PersonalIds { get; set; } // Birden fazla PersonalId'yi saklamak için bir liste kullanabilirsiniz.

    }
}
