using System.Collections.Generic;

namespace WorkBuddies.Models
{
    public class HangoutVibe
    {
        public int Id { get; set; }
        public int HangoutId { get; set; }
        public int VibeId { get; set; }
        public List<int> VibeIds { get; set; }
    }
}