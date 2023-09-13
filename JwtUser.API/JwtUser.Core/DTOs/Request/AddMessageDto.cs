using JwtUser.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.DTOs.Request
{
    public class AddMessageDto
    {
        public string? Content { get; set; }
        public DateTime? Timestamp { get; set; }
        public string? FromId { get; set; }
        public string? ToId { get; set; }
    }
}
