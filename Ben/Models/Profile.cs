using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Ben.Models
{
    public class Profile
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Avatar { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FatherName { get; set; }
        public string CodeMeli { get; set; }
        public string Description { get; set; }

        public string AccountId { get; set; }
        [ForeignKey("AccountId")]
        public ApplicationUser Account { get; set; }
    }
}
