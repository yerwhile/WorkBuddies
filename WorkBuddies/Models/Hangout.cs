using System.ComponentModel.DataAnnotations;

namespace WorkBuddies.Models
{
    public class Hangout
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string StreetAddress { get; set; }
        public string City { get; set; }
        public string State { get; set; }

    }
}
