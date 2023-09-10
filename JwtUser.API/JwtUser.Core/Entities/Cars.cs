using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.Entities
{
    public class Cars
    {
        public int Id { get; set; }
        public string? Model { get; set; }
        public string? Brand { get; set; }
        public int? Capacity { get; set; }
        public string? Plate { get; set; }


        public string? CompanyId { get; set; }
        public AppUser? Company { get; set; }

    }
}
