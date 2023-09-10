﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace JwtUser.Core.Entities
{
    public class AppUser : IdentityUser
    {
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? CompanyName { get; set; }
        public bool IsCompany { get; set; }

        [JsonIgnore]
        public ICollection<Transport> Transports { get; set; }
        
        [JsonIgnore]
        public ICollection<Application> Applications { get; set; }

    }
}
