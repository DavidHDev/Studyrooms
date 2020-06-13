using System;

namespace Domain
{
    public class Comment
    {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public virtual AppUser Author { get; set; }
        public virtual Announcement Announcement { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}