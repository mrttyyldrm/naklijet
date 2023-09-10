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



        public string Directions { get; set; }      //adres tarifi

        public int itemCount { get; set; }
        public int packageCount { get; set; }


        //[JsonIgnore]
        public int StreetId { get; set; }

        //[JsonIgnore]
        public Street Street { get; set; }



        //[JsonIgnore]
        public int HowCarryId { get; set; }

       // [JsonIgnore]
         public HowCarry HowCarries { get; set; }


       //[JsonIgnore]
        public int PackageHelperId { get; set; }

       // [JsonIgnore]
        public PackageHelper PackageHelpers { get; set; }


        //[JsonIgnore]
        public int InsuranceId { get; set; }

        //[JsonIgnore]
        public Insurance Insurances { get; set; }


        //[JsonIgnore]
        public string AppUserId { get; set; }

        [JsonIgnore]
        public AppUser AppUser { get; set; }
        
        public int? ToStreetId { get; set; }
        public Street? ToStreet { get; set; }

    }
}
