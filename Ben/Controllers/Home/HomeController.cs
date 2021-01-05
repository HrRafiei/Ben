using Ben.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ben.Controllers.Home
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Produces("application/json")]
    public class HomeController : ControllerBase
    {
        private readonly ApplicationDatabaseContext _context;
        public HomeController(ApplicationDatabaseContext context)
        {
            _context = context;
        }

        public IEnumerable<Event> GetEvents()
        {
            var list = _context.Events.ToList();
            return list;
        }
    }
}
