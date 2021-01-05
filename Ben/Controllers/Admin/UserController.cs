using Ben.Models;
using Ben.Services;
using Ben.ViewModels.Admin.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Ben.Controllers.Admin
{
    [Route("api/Admin/[controller]/[action]")]
    [ApiController]
    [Produces("application/json")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IMessageService _messageService;
        private readonly ApplicationDatabaseContext _context;

        public UserController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            IMessageService messageService,
            ApplicationDatabaseContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _messageService = messageService;
            _context = context;
        }



        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _userManager.Users.ToListAsync();
            var viewModelList = list.Select(u => new GetUserViewModel { 
                UserName = u.UserName, 
                Role = _userManager.GetRolesAsync(u).Result[0],
                IsValid = u.IsValid
            });
            return Ok(viewModelList);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound();
            var viewModel = new GetUserViewModel();
            viewModel.UserName = user.UserName;
            viewModel.IsValid = user.IsValid;
            var roles = await _userManager.GetRolesAsync(user);
            viewModel.Role = roles[0];
            return Ok(viewModel);
        }


        [HttpGet("{userName}")]
        public async Task<IActionResult> GetUserByName(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
                return NotFound();
            var viewModel = new GetUserViewModel();
            viewModel.UserName = user.UserName;
            viewModel.IsValid = user.IsValid;
            var roles = await _userManager.GetRolesAsync(user);
            viewModel.Role = roles[0];
            return Ok(viewModel);
        }


        //GET: /api/Admin/User/Search/ serach value
        [HttpGet("{searchValue}")]
        public async Task<IActionResult> Search(string searchValue)
        {
            var users = await _userManager.Users.Where(u => u.UserName.Contains(searchValue)).ToListAsync();
            return Ok(users);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CreateUserViewModel model)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            var existUser = await _userManager.FindByNameAsync(model.UserName);
            if (existUser != null)
                return BadRequest();

            if(!Regex.IsMatch(model.UserName, @"^09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$"))
            {
                return BadRequest();
            }

            var user = new ApplicationUser();
            user.UserName = model.UserName;
            user.PhoneNumber = model.UserName;
            user.PhoneNumberConfirmed = true;
            var result = await _userManager.CreateAsync(user, model.Password);
            if(result.Succeeded)
            {
                var addToRole = await _userManager.AddToRoleAsync(user, model.Role);
                if (addToRole.Succeeded)
                {
                    //create profile 
                    var profile = new Profile();
                    profile.AccountId = user.Id;
                    profile.Account = user;
                    await _context.Profiles.AddAsync(profile);
                    bool addedProfile = Convert.ToBoolean(await _context.SaveChangesAsync());
                    // send registerd sms successfully with password;
                    if(addedProfile)
                    {
                        var sendedMessage = await _messageService.SendRegisterSuccessfullySms(user.UserName, model.Password);
                        
                        if(sendedMessage)
                        {
                            var viewModel = new GetUserViewModel();
                            viewModel.UserName = user.UserName;
                            viewModel.Role = model.Role;
                            return Ok(viewModel);
                        }
                    }
                }
            }
            return BadRequest();
        }
    }
}
