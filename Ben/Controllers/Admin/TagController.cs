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
    public class TagController : ControllerBase
    {
        private readonly ApplicationDatabaseContext _context;
        public TagController(ApplicationDatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Tag>> GetAll()
        {
            var list = await _context.Tags.ToListAsync();
            return list;
        } // end

        [HttpGet("{tagId}")]
        public async Task<Tag> GetCategory(string tagId)
        {
            var category = await _context.Tags
                .FindAsync(tagId);
            return category;
        } // end

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] Tag model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var existModel = await _context.Tags.Where(c => c.Name.Equals(model.Name)).FirstOrDefaultAsync();
            if (existModel != null)
            {
                return BadRequest();
            }

            var tag = new Tag();
            tag.Name = model.Name;

            await _context.Tags.AddAsync(tag);
            if (await Save())
            {
                return Ok(tag);
            }
            return BadRequest();
        } // end



        [HttpPut("{tagId}")]
        public async Task<IActionResult> EditCategory(string tagId, [FromForm] Tag tag)
        {
            if (!ModelState.IsValid) return BadRequest();
            if (tagId != tag.Id) return BadRequest();

            var existTag = await _context.Tags.Where(c => c.Name.Equals(tag.Name)).FirstOrDefaultAsync();
            if (existTag != null && tag.Id != existTag.Id)
                return BadRequest();

            if (existTag != null)
                _context.Entry(existTag).State = EntityState.Detached;

            var model = await _context.Tags.FindAsync(tagId);
            if (model == null) return BadRequest();

            model.Name = tag.Name;
            _context.Entry(model).State = EntityState.Modified;

            if (await Save())
            {
                return Ok(model);
            }

            return BadRequest();

        } // end


        [HttpDelete("{tagId}")]
        public async Task<IActionResult> Delete(string tagId)
        {
            var tag = await _context.Tags.FindAsync(tagId);
            if (tag == null) return NotFound();

            _context.Tags.Remove(tag);
            if (await Save()) return Ok();
            return BadRequest();
        }


        [NonAction]
        public async Task<bool> Save()
        {
            bool result = Convert.ToBoolean(await _context.SaveChangesAsync());
            return result;
        } // end

    }
}
