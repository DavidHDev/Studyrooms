using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context){
            if(!context.Announcements.Any()){
                var announcements = new List<Announcement>{
                   new Announcement
                   {
                       Title = "Past Announcement 1",
                       Date = DateTime.Now.AddMonths(-2),
                       Description = "Announcement 2 months ago",
                       Category = "drinks",
                       Location = "London",
                       Room = "Pub",
                   },
                   new Announcement
                   {
                       Title = "Past Announcement 2",
                       Date = DateTime.Now.AddMonths(-1),
                       Description = "Announcement 1 month ago",
                       Category = "culture",
                       Location = "Paris",
                       Room = "Louvre",
                   },
                   new Announcement
                   {
                       Title = "Future Announcement 1",
                       Date = DateTime.Now.AddMonths(1),
                       Description = "Announcement 1 month in future",
                       Category = "culture",
                       Location = "London",
                       Room = "Natural History Museum",
                   },
                   new Announcement
                   {
                       Title = "Future Announcement 2",
                       Date = DateTime.Now.AddMonths(2),
                       Description = "Announcement 2 months in future",
                       Category = "music",
                       Location = "London",
                       Room = "O2 Arena",
                   },
                   new Announcement
                   {
                       Title = "Future Announcement 3",
                       Date = DateTime.Now.AddMonths(3),
                       Description = "Announcement 3 months in future",
                       Category = "drinks",
                       Location = "London",
                       Room = "Another pub",
                   },
                   new Announcement
                   {
                       Title = "Future Announcement 4",
                       Date = DateTime.Now.AddMonths(4),
                       Description = "Announcement 4 months in future",
                       Category = "drinks",
                       Location = "London",
                       Room = "Yet another pub",
                   },
                   new Announcement
                   {
                       Title = "Future Announcement 5",
                       Date = DateTime.Now.AddMonths(5),
                       Description = "Announcement 5 months in future",
                       Category = "drinks",
                       Location = "London",
                       Room = "Just another pub",
                   },
                   new Announcement
                   {
                       Title = "Future Announcement 6",
                       Date = DateTime.Now.AddMonths(6),
                       Description = "Announcement 6 months in future",
                       Category = "music",
                       Location = "London",
                       Room = "Roundhouse Camden",
                   },
                   new Announcement
                   {
                       Title = "Future Announcement 7",
                       Date = DateTime.Now.AddMonths(7),
                       Description = "Announcement 2 months ago",
                       Category = "travel",
                       Location = "London",
                       Room = "Somewhere on the Thames",
                   },
                   new Announcement
                   {
                       Title = "Future Announcement 8",
                       Date = DateTime.Now.AddMonths(8),
                       Description = "Announcement 8 months in future",
                       Category = "film",
                       Location = "London",
                       Room = "Cinema",
                   }
                };

                context.Announcements.AddRange(announcements);
                context.SaveChanges();
            }
        }
    }
}