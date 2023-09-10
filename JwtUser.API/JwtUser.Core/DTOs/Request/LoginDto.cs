using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.DTOs.Request
{
    public class LoginDto
    {
        [Required]
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
