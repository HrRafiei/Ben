using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Ben.Models
{
    public static class AppRoleStore
    {
        public static string admin = "admin";
        public static string judje = "judje";
        public static string guest = "guest";
    }
    public class ApplicationUser: IdentityUser
    {
        public bool IsValid { get; set; } = true;
        public DateTime CreatedDateTime { get; set; } = DateTime.Now;
        public bool IsJudje { get; set; } = false;
    }
}
