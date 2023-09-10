using JwtUser.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.DTOs.Response
{
    public class GetListApplicationDto
    {
        public AppUserDto? Company { get; set; }
        public CarsDto? Cars { get; set; }
        public decimal Price { get; set; }
        public int CompanyTransportTime { get; set; }
        public DateTime TransportTime { get; set; }
        public int TransportId { get; set; }
        public bool? IsSuccess { get; set; }


    }
}
