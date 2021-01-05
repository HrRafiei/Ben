using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ben.ViewModels.Admin.User
{
    public class GetUserViewModel
    {
        public string UserName { get; set; }
        public string Role { get; set; }
        public bool IsValid { get; set; }
    }
}
