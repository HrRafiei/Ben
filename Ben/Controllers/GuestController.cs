using System.Dynamic;
using System.Runtime.CompilerServices;
using System.Net;
using System.Runtime.InteropServices;
using System.Reflection;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ben.Models;
using Microsoft.EntityFrameworkCore;
using Ben.Services;
using Ben.ViewModels.Guest;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace Ben.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Produces("application/json")]
    public class GuestController : ControllerBase
    {
        private readonly ApplicationDatabaseContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserService _userService;
        private readonly IWebHostEnvironment _host;

        public GuestController(ApplicationDatabaseContext context,
        IUserService userService,
        UserManager<ApplicationUser> userManager,
        IWebHostEnvironment host)
        {
            _context = context;
            _userService = userService;
            _userManager = userManager;
            _host = host;
        }


        //GET: /api/Guest/GetCurrentUser
        [HttpGet]
        public async Task<IActionResult> GetCurrentUser() {
            var user = await _userService.CurrentUser();
            return Ok(user);
        } // end

        //GET: /api/Guest/GetCurrentUserProfile
        public async Task<IActionResult> GetCurrentUserProfile()
        {
            var user = await _userService.CurrentUser();
            var profile = await _context.Profiles.Where(p => p.AccountId.Equals(user.Id)).FirstOrDefaultAsync();
            return Ok(profile);
        } // end

        //GET: /api/Guest/GetEvents
        [HttpGet]
        public async Task<IEnumerable<Event>> GetEvents()
        {
            var list = await _context.Events.ToListAsync();
            return list;
        }


        //GET: /api/Guest/CanAddIdea/userId/eventId
        [HttpGet("{eventId}")]
        public bool CanAddIdea(string eventId) {
            var currentUser = _userService.CurrentUser();
            var userIdeas =  _context.Ideas.Where(i => i.AuthorId.Equals(currentUser.Id)).ToList();
            var ideasWithEventId = userIdeas.Where(i => i.EventId.Equals(eventId)).ToList();
            if(ideasWithEventId.Count > 3) return false;
            return true;
        }

        //GET: /api/Guest/GetCategories
        [HttpGet]
        public async Task<IEnumerable<Category>> GetCategories() {
            var list = await _context.Categories.ToListAsync();
            return list;
        }


        //GET: /api/Guest/GetTags
        [HttpGet]
        public async Task<IActionResult> GetTags() {
            var list = await _context.Tags.ToListAsync();
            return Ok(list);
        }

        //GET: /api/Guest/GetEventIdeasByUserId
        [HttpGet("{eventId}")]
        public async Task<IActionResult> GetEventIdeasByUserId(string eventId) {
            
            var currentUser = await _userService.CurrentUser();
            if(currentUser == null) return BadRequest();

            var eventEntity = await _context.Events.FindAsync(eventId);
            if(eventEntity == null) return NotFound();

            var list = await _context.Ideas.Where(i => i.AuthorId.Equals(currentUser.Id) && i.EventId.Equals(eventId)).ToListAsync();

            return Ok(list);
        } // end


        //POST: /api/Guest/AddIdea
        [HttpPost]
        public async Task<IActionResult> AddIdea([FromForm] AddIdeaViewModel model) {
            if(!ModelState.IsValid) return BadRequest();

            var currentUser = await _userService.CurrentUser();
            var userIdeas = await _context.Ideas.Where(i => i.AuthorId.Equals(currentUser.Id)).ToListAsync();
            var ideasWithEventId = userIdeas.Where(i => i.EventId.Equals(model.EventId)).ToList();
            if(ideasWithEventId.Count >= 3) return BadRequest();

            var idea = new Idea();
            idea.AuthorId = currentUser.Id;
            idea.Author = currentUser;
            idea.CategoryId = model.CategoryId;
            idea.Category = await _context.Categories.FindAsync(model.CategoryId);
            idea.Title = model.Title;
            idea.Description = model.Description;

            if(model.Tags.Count > 0 ) {
                foreach (var tagId in model.Tags)
                {
                    var ideaTag =  new IdeaTags();
                    ideaTag.IdeaId = idea.Id;
                    ideaTag.TagId = tagId;
                    await _context.IdeaTags.AddAsync(ideaTag);
                }
            }


            idea.EventId = model.EventId;
            idea.Event = await _context.Events.FindAsync(model.EventId);

            await _context.Ideas.AddAsync(idea);
            bool result = Convert.ToBoolean(await _context.SaveChangesAsync());
            if(result) {
                return Ok(idea);
            }

            return BadRequest();
        } // end



        //DELETE: /api/Guest/Delete/ delete by idea's id
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id) {
            var idea = await _context.Ideas.FindAsync(id);
            if(idea == null) return BadRequest();

            _context.Ideas.Remove(idea);
            bool saved = Convert.ToBoolean(await _context.SaveChangesAsync());
            
            if(saved) return Ok();
            return BadRequest();
        } // end

    
    
        //POST: /api/Guest/AddTag/ create new tag
        [HttpPost]
        public async Task<IActionResult> AddTag([FromForm] Tag model) {
            var existTag = await _context.Tags.Where(t => t.Name.Equals(model.Name)).FirstOrDefaultAsync();
            if(existTag != null) return BadRequest();

            var entity = new Tag();
            entity.Name = model.Name;
            await _context.Tags.AddAsync(entity);
            bool saved = Convert.ToBoolean(await _context.SaveChangesAsync());
            if(saved) return Ok(entity);
            return BadRequest();
        } // end



        // GET: /api/Guest/JudjeRequest
        [HttpGet]
        public async Task<IActionResult> JudjeRequest() {
            var user = await _userService.CurrentUser();
            user.IsJudje = true;
            var updated = await _userManager.UpdateAsync(user);
            if(updated.Succeeded) {
                return Ok(user);
            }
            return BadRequest();
        } // end


        //POST: /api/Guest/ChangePassword
        [HttpPost]
        public async Task<IActionResult> ChangePassword( [FromForm] ChangePasswordViewModel model)
        {
            if(model.Password != model.ConfirmPassword)
            {
                return BadRequest();
            }

            var user = await _userService.CurrentUser();
            var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.Password);
            if(result.Succeeded)
            {
                return Ok();
            }
            return BadRequest();  
        } // end


        //POST: /api/Guest/UploadAvatar
        [HttpPost]
        public async Task<IActionResult> UploadAvatar([FromForm] IFormFile avatar)
        {
            if (avatar == null) return BadRequest();

            string directory = Path.Combine(_host.ContentRootPath, "upload");
            if (!Directory.Exists(directory)) Directory.CreateDirectory(directory);

            string fileName = Guid.NewGuid().ToString() + "_" + avatar.FileName;
            string fileRoot = Path.Combine(directory, fileName);

            using (var stream = new FileStream(fileRoot, FileMode.Create))
            {
                avatar.CopyTo(stream);
                string absolutePath = Path.Combine("upload", fileName);
                var user = await _userService.CurrentUser();
                var profile = await _context.Profiles.Where(p => p.AccountId.Equals(user.Id)).FirstOrDefaultAsync();
                profile.Avatar = absolutePath;
                bool result = Convert.ToBoolean(await _context.SaveChangesAsync());

                if (result) return Ok(profile);
                return BadRequest();
            }

        } // end



        // DELETE: /api/Guest/DeleteAvatar
        [HttpDelete("{path}")]
        public async Task<IActionResult> DeleteAvatar(string path)
        {
            string rootPath = Path.Combine(_host.ContentRootPath, path);
            if (!System.IO.File.Exists(rootPath)) return BadRequest();

            System.IO.File.Delete(rootPath);

            var user = await _userService.CurrentUser();
            var profile = await _context.Profiles.Where(p => p.AccountId.Equals(user.Id)).FirstOrDefaultAsync();
            profile.Avatar = rootPath;

            bool result = Convert.ToBoolean(await _context.SaveChangesAsync());

            if (result) return Ok(profile);

            return BadRequest();
        } // end


        //POST: /api/Guest/UpdateProfileInfo
        [HttpPost]
        public async Task<IActionResult> UpdateProfileInfo([FromForm] UpdateProfileInfoViewModel model)
        {
            var user = await _userService.CurrentUser();
            var profile = await _context.Profiles.Where(u => u.AccountId.Equals(user.Id)).FirstOrDefaultAsync();
            profile.FirstName = model.FirstName;
            profile.LastName = model.LastName;
            profile.FatherName = model.FatherName;
            profile.CodeMeli = model.CodeMeli;
            profile.Description = model.Description;

            _context.Entry(profile).State = EntityState.Modified;

            bool result = Convert.ToBoolean(await _context.SaveChangesAsync());
            if(result)
            {
                return Ok(profile);
            }

            return BadRequest();
        }
    }
}
