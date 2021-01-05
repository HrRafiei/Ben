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
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDatabaseContext _context;
        public CategoryController(ApplicationDatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Category>> GetAll()
        {
            var list = await _context.Categories.ToListAsync();
            return list;
        } // end

        [HttpGet("{categoryId}")]
        public async Task<Category> GetCategory(string categoryId)
        {
            var category = await _context.Categories.FindAsync(categoryId);
            return category;
        } // end

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] Category model)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            var existModel = await _context.Categories.Where(c => c.Name.Equals(model.Name)).FirstOrDefaultAsync();
            if(existModel != null)
            {
                return BadRequest();
            }

            var catetory = new Category();
            catetory.Name = model.Name;

            await _context.Categories.AddAsync(catetory);
            if(await Save())
            {
                return Ok(catetory);
            }
            return BadRequest();
        } // end



        [HttpPut("{categoryId}")]
        public async Task<IActionResult> EditCategory(string categoryId, [FromForm] Category category)
        {
            if (!ModelState.IsValid) return BadRequest();
            if (categoryId != category.Id) return BadRequest();

            var existCategory = await _context.Categories.Where(c => c.Name.Equals(category.Name)).FirstOrDefaultAsync();
            if (existCategory != null && category.Id != existCategory.Id) 
                return BadRequest();

           if(existCategory != null)
                 _context.Entry(existCategory).State = EntityState.Detached;

            var model = await _context.Categories.FindAsync(categoryId);
            if (model == null) return BadRequest();

            model.Name = category.Name;
            _context.Entry(model).State = EntityState.Modified;

            if(await Save())
            {
                return Ok(model);
            }

            return BadRequest();

        } // end


        [HttpDelete("{categoryId}")]
        public async  Task<IActionResult> Delete(string categoryId)
        {
            var category = await _context.Categories.FindAsync(categoryId);
            if (category == null) return NotFound();

            _context.Categories.Remove(category);
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
