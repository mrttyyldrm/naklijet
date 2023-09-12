using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.DTOs.Request
{
    public class AddTransportCityDto
    {
        public int CategoryId { get; set; }

        public string? Description { get; set; }      //adres tarifi
        public int bigitemCount { get; set; }
        public int miditemCount { get; set; }
        public int smallitemCount { get; set; }




        public int StreetId { get; set; }


        public int HowCarryId { get; set; }




        public bool isPackageHelpers { get; set; }


        public bool isInsurances { get; set; }



        public string AppUserId { get; set; }

        public int? ToStreetId { get; set; }

        public bool isIntercity { get; set; }

    }
}
