﻿using System.ComponentModel.DataAnnotations;

namespace WorkBuddies.Models
{
    public class Buddy
    {
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; }
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string State { get; set; }
        public string Image { get; set; }
        public string About { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string CompanyName { get; set; }
        public string CompanyIndustry { get; set; }
        public string CompanyRole { get; set; }

        [Required]
        public string FirebaseUserId { get; set; }
    }
}
