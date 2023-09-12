using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.Entities
{
    public class Message : BaseEntity
    {
        public int AppUserId { get; set; }
        public AppUser  AppUser { get; set; }


        public string? CompanyId { get; set; }
        public AppUser? Company { get; set; }


        public string AppUserContent { get; set; }
        public string CompanyContent { get; set; }
        public DateTime Timestamp { get; set; }

        //SendMessage, ReceiveMessage adında 2 tablo açsak ? 
        //Ama o zaman da tüm mesajları çekerken problem olur.
    }
}
