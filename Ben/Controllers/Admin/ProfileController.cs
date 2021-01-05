using Ben.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ben.Controllers.Admin
{
    [Route("api/Admin/[controller]/[action]")]
    [ApiController]
    [Produces("application/json")]
    public class ProfileController : ControllerBase
    {
        private readonly ApplicationDatabaseContext _context;
        public ProfileController(ApplicationDatabaseContext context)
        {
            _context = context;
        }


        [HttpGet("{profileId}")]
        public async Task<IActionResult> Get(int profileId)
        {
            var profile = await _context.Profiles.FindAsync(profileId);
            if (profile == null) return NotFound();
            return Ok(profile);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _context.Profiles.ToListAsync();
            return Ok(list);
        }

        [HttpGet("{accountId}")]
        public async Task<Profile> GetByAccountId(string accountId)
        {
            var profile = await _context.Profiles.Where(p => p.AccountId.Equals(accountId)).FirstOrDefaultAsync();

            return profile;
        }


    }
}
