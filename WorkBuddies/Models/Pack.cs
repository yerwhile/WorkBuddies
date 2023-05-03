using System;
using System.ComponentModel.DataAnnotations;

namespace WorkBuddies.Models
{
    public class Pack
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Schedule { get; set; }
        public string? Image { get; set; }
        [Required]
        public DateTime CreateDate { get; set; }
        [Required]
        public bool IsOpen { get; set; }
    }
}
