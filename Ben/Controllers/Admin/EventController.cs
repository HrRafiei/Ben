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
    public class EventController : ControllerBase
    {
        private readonly ApplicationDatabaseContext _context;
        public EventController(ApplicationDatabaseContext context)
        {
            _context = context;
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var model = await _context.Events.FindAsync(id);
            return Ok(model);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _context.Events.ToListAsync();
            return Ok(list);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] Event model)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            var existModel = await _context.Events.Where(e => e.Name.Equals(model.Name)).FirstOrDefaultAsync();
            if (existModel != null) return BadRequest();

            var entity = new Event();
            entity.Name = model.Name;
            entity.Description = model.Description;

            await _context.Events.AddAsync(entity);
            bool result = Convert.ToBoolean(await _context.SaveChangesAsync());
            if(result)
            {
                return Ok(entity);
            }
            return BadRequest();
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(string id, [FromForm] Event model)
        {
            if(id != model.Id)
            {
                return BadRequest();
            }

            var exist = await _context.Events.Where(e => e.Name.Equals(model.Name)).FirstOrDefaultAsync();
            if(exist != null)
            {
                if(exist.Id != id)
                {
                    return BadRequest();
                }

                _context.Entry(exist).State = EntityState.Detached;
            }

          

            var entity = await _context.Events.FindAsync(id);
            if(entity == null)
            {
                return NotFound();
            }

            entity.Name = model.Name;
            entity.Description = model.Description;
            _context.Entry(entity).State = EntityState.Modified;

            bool result = Convert.ToBoolean(await _context.SaveChangesAsync());
            if(result)
            {
                return Ok(entity);
            }

            return BadRequest();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var model = await _context.Events.FindAsync(id);
            if (model == null) return NotFound();

            _context.Events.Remove(model);
            bool result = Convert.ToBoolean(await _context.SaveChangesAsync());
            if(result)
            {
                return Ok();
            }
            return BadRequest();
        }
    }
}
