using JwtUser.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.DTOs.Request
{
    public class AddAppPersonalDto
    {
        public int PersonalId { get; set; }
        public int ApplicationId { get; set; }
    }
}
