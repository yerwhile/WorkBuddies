using System.Collections.Generic;

namespace WorkBuddies.Models
{
    public class PackVibe
    {
        public int Id { get; set; }
        public int PackId { get; set; }
        public int VibeId { get; set; }

        public List<int> VibeIds { get; set; }
    }
}
