using System;
namespace Ben.Models
{
    public class IdeaTags
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string IdeaId { get; set; } = Guid.NewGuid().ToString();
        public string TagId { get; set; } = Guid.NewGuid().ToString();
    }
}