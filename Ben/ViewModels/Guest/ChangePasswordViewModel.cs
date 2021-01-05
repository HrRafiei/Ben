using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ben.ViewModels.Guest
{
    public class ChangePasswordViewModel
    {
        public string OldPassword { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
