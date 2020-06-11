using System;

namespace Domain
{
    public class UserAnnouncement
    {
        public string AppUserId { get; set;}

        public virtual AppUser AppUser { get; set; }
        public Guid AnnouncementId { get; set; }

        public virtual Announcement Announcement {get; set;}
        public DateTime DateJoined { get; set; }

        public bool IsHost { get; set; }
    }
}