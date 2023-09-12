using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace JwtUser.Core.Entities
{
    public class Street : BaseEntity
    {
        public string Name { get; set; }
        public int TownId { get; set; }
        //[JsonIgnore]
        public Town Towns { get; set; }


    }
}
