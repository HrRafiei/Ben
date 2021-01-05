using Ben.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ben.Services
{
    public interface IUserService
    {
        public Task<ApplicationUser> CurrentUser();
    }
}
