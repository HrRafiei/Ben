using Ben.Models;
using Ben.ViewModels.Admin.Idea;
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
    public class IdeaController : ControllerBase
    {
        private readonly ApplicationDatabaseContext _coontext;
        public IdeaController(ApplicationDatabaseContext context)
        {
            _coontext = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _coontext.Ideas.ToListAsync();
            var viewModels = new List<GetIdeaViewModel>();
            foreach (var item in list)
            {
                var viewModel = new GetIdeaViewModel();
                viewModel.Title = item.Title;
                viewModel.Description = item.Description;
                viewModel.EventName = _coontext.Events.FindAsync(item.EventId).Result.Name;
                viewModel.CategoryName = _coontext.Categories.Find(item.CategoryId).Name;
                viewModel.UserName = _coontext.Users.Find(item.AuthorId).UserName;

                viewModels.Add(viewModel);
            }
            return Ok(viewModels);
        }
    }
}
