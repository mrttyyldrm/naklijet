using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.Entities
{
    public class Street : BaseEntity
    {
        public string Name { get; set; }
        public int TownId { get; set; }
        public Town Towns { get; set; }
    }
}
