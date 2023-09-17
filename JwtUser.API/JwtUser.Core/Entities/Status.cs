using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace JwtUser.Core.Entities
{
    public class Status : BaseEntity
    {
        public string? Name { get; set; }


        //Relations

        [JsonIgnore]
        public ICollection<Application>? Applications { get; set; }

    }
}
