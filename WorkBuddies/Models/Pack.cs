using System;
using System.Collections.Generic;
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
        public List<Vibe> Vibes { get; set; }
        public List<Hangout> Hangouts { get; set; }
        public List<Buddy> Buddies { get; set; }
    }
}
