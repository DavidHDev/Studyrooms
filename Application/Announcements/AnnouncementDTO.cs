using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Application.Announcements
{
    public class AnnouncementDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set;}
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public string Room { get; set; }

        [JsonPropertyName("attendees")]
        public ICollection<AttendeeDTO> UserAnnouncements { get; set; }
    }
}