using Ben.Models;
using Ben.Services;
using Ben.ViewModels.Home;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Ben.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Produces("application/json")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMessageService _messageService;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationDatabaseContext _context;
        public AccountController(UserManager<ApplicationUser> userManager,
            IMessageService messageService,
            SignInManager<ApplicationUser> signInManager,
            ApplicationDatabaseContext context)
        {
            _userManager = userManager;
            _messageService = messageService;
            _signInManager = signInManager;
            _context = context;
        }

        //POST: /Account/Login
        [HttpPost]
        public async Task<IActionResult> Login([FromForm] LoginViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest();

            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null) return BadRequest();

            
            var confirmedPhoneNumber = await _userManager.IsPhoneNumberConfirmedAsync(user);
            if (!confirmedPhoneNumber) return BadRequest();

            var isMatchPass = await _signInManager.PasswordSignInAsync(user, model.Password, false, true);
            if (!isMatchPass.Succeeded) return BadRequest();

            string userRole = _userManager.GetRolesAsync(user).Result[0];
            var token = GenerateToken(user, userRole);

            return Ok(token);
        } // end


        //GET: /Account/Logout
        [HttpGet]
        public async Task<IActionResult> Logout() {
            await _signInManager.SignOutAsync();
            return Ok();
        }

        //POST: /Account/Register
        [HttpPost]
        public async Task<IActionResult> Register([FromForm] RegisterViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var existModel = await _userManager.FindByNameAsync(model.UserName);
            if (existModel != null)
                return BadRequest();

            if (!Regex.IsMatch(model.UserName, @"^09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$"))
            {
                return BadRequest();
            }


            var user = new ApplicationUser();
            user.UserName = model.UserName;
            user.PhoneNumber = model.UserName;
            user.PhoneNumber = model.UserName;

            var created = await _userManager.CreateAsync(user, model.Password);
            if(created.Succeeded)
            {
                var addRole = await _userManager.AddToRoleAsync(user, AppRoleStore.guest);
                if(!addRole.Succeeded)
                {
                    return BadRequest();
                }

                var profile = new Profile();
                profile.AccountId = user.Id;
                profile.Account = user;

                _context.Profiles.Add(profile);
                _context.SaveChanges();
                

                var code = await _userManager.GenerateChangePhoneNumberTokenAsync(user, user.PhoneNumber);
                Console.WriteLine(code);
                var sended = await _messageService.SendRegisterSuccessfullySms(user.UserName, code);
                if(sended)
                {
                    var viewModel = new GetUserViewModel();
                    viewModel.UserName = user.UserName;
                   
                    viewModel.Token = GenerateToken(user, AppRoleStore.guest);
                    return Ok(viewModel);
                }
               
            }
            return BadRequest();
        } // end


        [HttpPost]
        public async Task<IActionResult> VerifyAccount([FromForm] VerifyAccountViewModel model)
        {
            if(!ModelState.IsValid) return BadRequest();

            var user = await _userManager.FindByNameAsync(model.UserName);
            if(user == null) return BadRequest();

            
            var result = await _userManager.VerifyChangePhoneNumberTokenAsync(user, model.Code, user.PhoneNumber);
            if(result) {
                user.PhoneNumberConfirmed = true;
                var updated = await _userManager.UpdateAsync(user);
                if(updated.Succeeded) {
                    return Ok();
                }
            }
            return BadRequest();

        } // end



        [NonAction]
        private string GenerateToken(ApplicationUser user, string role)
        {
            try
            {
                List<Claim> claims = new List<Claim> {
                    new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, user.Id),
                    new Claim(ClaimTypes.Name, user.Id),
                    new Claim(ClaimTypes.Role, role),
                    new Claim("role", role)
                };

                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("This is a security key validation"));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                JwtSecurityToken securityToken = new JwtSecurityToken(claims: claims, expires: DateTime.Now.AddMinutes(120), signingCredentials: credentials);
                return new JwtSecurityTokenHandler().WriteToken(securityToken);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return String.Empty;
            }
        }

    }
}
