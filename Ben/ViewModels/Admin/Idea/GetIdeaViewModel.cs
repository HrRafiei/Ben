using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ben.ViewModels.Admin.Idea
{
    public class GetIdeaViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string UserName { get; set; }
        public string EventName { get; set; }
        public string CategoryName { get; set; }
    }
}
