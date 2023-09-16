using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.Entities
{
    public class Message : BaseEntity
    {
        public string? Content { get; set; }
        public DateTime? Timestamp { get; set; }


        //Relations

        public string? FromId { get; set; }
        public AppUser? From { get; set; }
        public string? ToId { get; set; }
    }
}
