using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.DTOs.Response
{
    public class CarsDto
    {
        public string? Model { get; set; }
        public string? Brand { get; set; }
        public int? Capacity { get; set; }
        public string? Plate { get; set; }
        public string? CompanyId { get; set; }
    }
}
