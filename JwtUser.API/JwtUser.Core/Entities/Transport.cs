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


        public string? Description { get; set; }      
        public int bigitemCount { get; set; }
        public int miditemCount { get; set; }
        public int smallitemCount { get; set; }
        public bool isIntercity { get; set; }
        public int Weight { get; set; }
        public bool isPackageHelpers { get; set; }

        public bool isInsurances { get; set; }
        public bool? isShow { get; set; }


        //Relations

        public int StreetId { get; set; }
        public Street Street { get; set; }



        public int HowCarryId { get; set; }

        public HowCarry HowCarries { get; set; }




        public string AppUserId { get; set; }

        public AppUser AppUser { get; set; }


        public int? ToStreetId { get; set; }
        public Street? ToStreet { get; set; }


        public int CategoryId { get; set; }
        public Category Category { get; set; }




    }
}
