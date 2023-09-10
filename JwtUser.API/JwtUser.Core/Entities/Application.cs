using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.Entities
{
    public class Application : BaseEntity
    {
        public string? CompanyId { get; set; }
        public AppUser? Company { get; set; }

        public decimal Price { get; set; }

        public int CompanyTransportTime { get; set; }
        public DateTime TransportTime { get; set; }



        public int TransportId { get; set; }
        public Transport? Transports { get; set; }



        public int CarsId { get; set; }
        public Cars? Cars { get; set; }


        public bool? IsSuccess { get; set; }


        public float? Rate { get; set; }
    }
}
