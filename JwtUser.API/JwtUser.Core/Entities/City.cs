﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace JwtUser.Core.Entities
{
    public class City : BaseEntity
    {
        public string Name { get; set; }


        [JsonIgnore]
        public ICollection<Town> Towns { get; set; }

    }
}
