using System.Collections.Generic;

namespace Ben.ViewModels.Guest
{
    public class AddIdeaViewModel
    {
        public string EventId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CategoryId { get; set; }
        public List<string> Tags { get; set; }
        
    }
}