using System;

namespace WorkBuddies.Models
{
    public class Pack
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public DateTime CreateDate { get; set; }
        public bool IsOpen { get; set; }
    }
}
