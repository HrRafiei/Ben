using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Ben.Models
{
    public enum IdeaStatus
    {
        processing = 0,
        accept = 1,
        failed = 2
    }
    public class Idea
    {

        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Title { get; set; }
        public DateTime CreatedDateTime { get; set; } = DateTime.Now;
        
        public string AuthorId { get; set; }
        [ForeignKey("AuthorId")]
        public ApplicationUser Author { get; set; }

        [MaxLength(3000)]
        [DataType(DataType.MultilineText)]
        public string Description { get; set; }
        public IdeaStatus Status { get; set; } = IdeaStatus.processing;

        public string CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public Category Category { get; set; }

        public ICollection<Tag> Tags { get; set; }

        public string EventId { get; set; }
        [ForeignKey("EventId")]
        public Event Event { get; set; }

    }
}
