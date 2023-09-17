using Microsoft.AspNetCore.Identity;
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

        #region overrides


        [JsonIgnore]
        public override bool EmailConfirmed { get; set; }

        [JsonIgnore]
        public override bool TwoFactorEnabled { get; set; }

        [JsonIgnore]
        public override string PhoneNumber { get; set; }

        [JsonIgnore]
        public override bool PhoneNumberConfirmed { get; set; }        
      

        [JsonIgnore]
        public override bool LockoutEnabled { get; set; }


        [JsonIgnore]
        public override string NormalizedEmail { get; set; }

        [JsonIgnore]
        public override DateTimeOffset? LockoutEnd { get; set; }

        [JsonIgnore]
        public override string ConcurrencyStamp { get; set; }

        [JsonIgnore]
        public override int AccessFailedCount { get; set; }

        #endregion

        
        //Relations

        [JsonIgnore]
        public ICollection<Transport> Transports { get; set; }
        
        [JsonIgnore]
        public ICollection<Application> Applications { get; set; }
       

    }
}
