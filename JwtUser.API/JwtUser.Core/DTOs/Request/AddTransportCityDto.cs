﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.DTOs.Request
{
    public class AddTransportCityDto
    {
        public int CategoryId { get; set; }

        public string Directions { get; set; }      //adres tarifi

        public int itemCount { get; set; }
        public int packageCount { get; set; }


        public int StreetId { get; set; }


        public int HowCarryId { get; set; }



        public int PackageHelperId { get; set; }

        public int InsuranceId { get; set; }


        public string AppUserId { get; set; }

        public int ToStreetId { get; set; }
    }
}