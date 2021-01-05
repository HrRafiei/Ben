using Ben.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Ben.Services
{
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor _accessor;
        private readonly UserManager<ApplicationUser> _userManager;
        public UserService(IHttpContextAccessor accessor, UserManager<ApplicationUser> userManager)
        {
            _accessor = accessor;
            _userManager = userManager;
        }

        public async Task<ApplicationUser> CurrentUser()
        {
            var userName = _accessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            ApplicationUser user = await _userManager.FindByNameAsync(userName);
            return user;
        }
    }
}
