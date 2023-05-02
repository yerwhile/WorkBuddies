using System.ComponentModel.DataAnnotations;

namespace WorkBuddies.Models
{
    public class Vibe
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

    }
}
