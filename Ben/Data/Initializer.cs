using Ben.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ben.Data
{
    public static class Initializer
    {
        public static async Task<bool> Init(
                UserManager<ApplicationUser> _userManager,
                RoleManager<IdentityRole> _roleManager,
                ApplicationDatabaseContext _context
            ) 
        {

            var adminRoleAdded = await _roleManager.CreateAsync(new IdentityRole(AppRoleStore.admin));
            if (!adminRoleAdded.Succeeded) return false;

            var judjeRoleAdded = await _roleManager.CreateAsync(new IdentityRole(AppRoleStore.judje));
            if (!judjeRoleAdded.Succeeded) return false;

            var guestRoleAdded = await _roleManager.CreateAsync(new IdentityRole(AppRoleStore.guest));
            if (!guestRoleAdded.Succeeded) return false;


            var adminUser = new ApplicationUser();
            adminUser.UserName = "09137019487";
            adminUser.PhoneNumber = "09137019487";
            adminUser.PhoneNumberConfirmed = true;

            var createdUser = await _userManager.CreateAsync(adminUser,"123456");
            if(createdUser.Succeeded)
            {
                await _userManager.AddToRoleAsync(adminUser, "admin");
            }


            var profile = new Profile();
            profile.AccountId = adminUser.Id;
            profile.Account = adminUser;

            _context.Profiles.Add(profile);
            bool savedContext = Convert.ToBoolean(_context.SaveChanges());

            return savedContext;
        }
    }

}
