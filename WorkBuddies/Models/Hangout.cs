using System.ComponentModel.DataAnnotations;

namespace WorkBuddies.Models
{
    public class Hangout
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string StreetAddress { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        [StringLength(2, MinimumLength = 2, ErrorMessage = "State must be two-letter abbreviation.")]
        public string State { get; set; }

    }
}
