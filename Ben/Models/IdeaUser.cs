using System;
using System.ComponentModel.DataAnnotations;

namespace Ben.Models
{
    public class IdeaUser
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string UserId { get; set; }
        public string IdeaId { get; set; }
    }
}