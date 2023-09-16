using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace JwtUser.Core.Entities
{
    public class Application : BaseEntity
    {

        public decimal Price { get; set; }
        public int CompanyTransportTime { get; set; }
        public DateTime TransportTime { get; set; }
        public bool? IsSuccess { get; set; }
        public float? Rate { get; set; }
        public string? CommentUser { get; set; }
        public string? Comment { get; set; }


        //Relations

        public string? CompanyId { get; set; }
        public AppUser? Company { get; set; }
       


        public int TransportId { get; set; }
        public Transport? Transports { get; set; }



        public int CarsId { get; set; }
        public Cars? Cars { get; set; }



        public int? StatusId { get; set; }
        public Status? Statuses { get; set; }

        public ICollection<AppPersonel> AppPersonels { get; set; }

    }
}
