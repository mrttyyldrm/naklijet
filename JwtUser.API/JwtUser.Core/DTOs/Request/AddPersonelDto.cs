using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.DTOs.Request
{
    public class AddPersonelDto
    {
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public int AppellationId { get; set; }
        public string? CompanyId { get; set; }

    }
}
