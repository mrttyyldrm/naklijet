using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.DTOs.Request
{
    public class UpdateApplicationDto
    {
        public string? CommentUser { get; set; }
        public string? Comment { get; set; }
        public int Rate { get; set; }
    }
}
