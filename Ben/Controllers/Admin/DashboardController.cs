using Ben.Models;
using Ben.ViewModels.Admin.Dashboard;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ben.Controllers.Admin
{
    [Route("api/Admin/[controller]/[action]")]
    [ApiController]
    [Produces("application/json")]
    public class DashboardController : ControllerBase
    {
        private readonly ApplicationDatabaseContext _context;
        public DashboardController(ApplicationDatabaseContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult GetStatistics()
        {
            int ideas = _context.Ideas.Count();
            int events = _context.Events.Count();
            int users = _context.Users.Count();
            int tags = _context.Tags.Count();
            int categories = _context.Categories.Count();

            var viewModel = new GetStatisticsViewModel();
            viewModel.Ideas = ideas;
            viewModel.Events = events;
            viewModel.Users = users;
            viewModel.Tags = tags;
            viewModel.Categories = categories;

            return Ok(viewModel);
        }
    }
}
