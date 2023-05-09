using System.Collections.Generic;

namespace WorkBuddies.Models
{
    public class PackHangout
    {
        public int Id { get; set; }
        public int PackId { get; set; }
        public int HangoutId { get; set; }
        public List<int> HangoutIds { get; set; }
    }
}
