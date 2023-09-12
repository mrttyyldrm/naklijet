using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Core.Entities
{
    public class AppPersonel : BaseEntity
    {
        public int PersonalId { get; set; }
        public Personal Personals { get; set; }

        public int ApplicationId { get; set; }
    }
}
