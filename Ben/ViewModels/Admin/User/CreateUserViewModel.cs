using Ben.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ben.ViewModels.Admin.User
{
    public class CreateUserViewModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Role { get; set; } = AppRoleStore.guest;
    }
}
