using JwtUser.Core.DTOs.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace JwtUser.Core.Entities
{
    public class Transport : BaseEntity
    {

        //[JsonIgnore]
        public int CategoryId { get; set; }
        // [JsonIgnore]
        public Category Category { get; set; }



        public string? Description { get; set; }      //adres tarifi

        public int bigitemCount { get; set; }
        public int miditemCount { get; set; }
        public int smallitemCount { get; set; }


        //[JsonIgnore]
        public int StreetId { get; set; }
        //[JsonIgnore]
        public Street Street { get; set; }



        //[JsonIgnore]
        public int HowCarryId { get; set; }

        // [JsonIgnore]
        public HowCarry HowCarries { get; set; }


        public bool isPackageHelpers { get; set; }


        public bool isInsurances { get; set; }


        //[JsonIgnore]
        public string AppUserId { get; set; }

        //[JsonIgnore]
        public AppUser AppUser { get; set; }

        public int? ToStreetId { get; set; }
        public Street? ToStreet { get; set; }


        public bool isIntercity  {get; set;}

        public int Weight { get; set; }
    }
}
