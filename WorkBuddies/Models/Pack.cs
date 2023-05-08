using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WorkBuddies.Models
{
    public class Pack
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Schedule { get; set; }
        public string? Image { get; set; }
        public DateTime CreateDate { get; set; }
        public bool IsOpen { get; set; }
        public List<Vibe> Vibes { get; set; }
        public List<Hangout> Hangouts { get; set; }
        public List<Buddy> Buddies { get; set; }
    }
}
