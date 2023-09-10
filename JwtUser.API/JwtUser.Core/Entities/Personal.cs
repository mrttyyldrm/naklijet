using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.Entities
{
    public class Personal : BaseEntity
    {
        public string? Name { get; set; }
        public string? Surname { get; set; }

        public int AppellationId { get; set; }
        public Appellation? Appellation { get; set; }



        public string? CompanyId { get; set; }
        public AppUser? Company { get; set; }
    }
}
