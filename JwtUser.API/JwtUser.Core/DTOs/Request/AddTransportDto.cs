using JwtUser.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.DTOs.Request
{
    public class AddTransportDto
    {

        public int CategoryId { get; set; }

        public string Directions { get; set; }      //adres tarifi

        public int bigitemCount { get; set; }
        public int miditemCount { get; set; }
        public int smallitemCount { get; set; }


        public int StreetId { get; set; }


        public int HowCarryId { get; set; }



        public int PackageHelperId { get; set; }

        public int InsuranceId { get; set; }


        public string AppUserId { get; set; }
    }
}
