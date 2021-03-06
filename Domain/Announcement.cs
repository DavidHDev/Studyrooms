using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Announcement
    {
        [MaxLength(255)]
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set;}
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public string Room { get; set; }

        public virtual ICollection<UserAnnouncement> UserAnnouncements { get; set; }
        public virtual ICollection<Comment> Comments {get; set;}
    }
}