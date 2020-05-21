using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager){


            if (!userManager.Users.Any()) {
                var users = new List<AppUser> {
                    new AppUser       
                    {
                        DisplayName = "Bob",
                        UserName = "Bob",
                        Email = "bob@test.com"
                    },
                    new AppUser       
                    {
                        DisplayName = "Tom",
                        UserName = "Tom",
                        Email = "tom@test.com"
                    },
                    new AppUser       
                    {
                        DisplayName = "David",
                        UserName = "David",
                        Email = "david@test.com"
                    },

                };
                foreach (var user in users) {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }


            if(!context.Announcements.Any()){
                var announcements = new List<Announcement>{
                   new Announcement
                   {
                       Title = "Announcement 1",
                       Date = DateTime.Now.AddMonths(-2),
                       Description = "Announcement 2 months ago",
                       Category = "Online",
                       Location = "From Home",
                       Room = "-",
                   },
                   new Announcement
                   {
                       Title = "Announcement 2",
                       Date = DateTime.Now.AddMonths(-1),
                       Description = "Announcement 1 month ago",
                       Category = "Conference",
                       Location = "FSEGA",
                       Room = "002",
                   },
                   new Announcement
                   {
                       Title = "Announcement 3",
                       Date = DateTime.Now.AddMonths(1),
                       Description = "Announcement 1 month in future",
                       Category = "Lecture",
                       Location = "Auditorium Maximum",
                       Room = "001",
                   },
                   new Announcement
                   {
                       Title = "Announcement 4",
                       Date = DateTime.Now.AddMonths(2),
                       Description = "Announcement 2 months in future",
                       Category = "Seminar",
                       Location = "FSEGA",
                       Room = "O03",
                   },
                   new Announcement
                   {
                       Title = "Announcement 5",
                       Date = DateTime.Now.AddMonths(3),
                       Description = "Announcement 3 months in future",
                       Category = "Workshop",
                       Location = "Cluj Hub",
                       Room = "003",
                   },
                   new Announcement
                   {
                       Title = "Announcement 6",
                       Date = DateTime.Now.AddMonths(4),
                       Description = "Announcement 4 months in future",
                       Category = "Seminar",
                       Location = "FSEGA",
                       Room = "411",
                   },
                   new Announcement
                   {
                       Title = "Announcement 7",
                       Date = DateTime.Now.AddMonths(5),
                       Description = "Announcement 5 months in future",
                       Category = "Workshop",
                       Location = "FSEGA",
                       Room = "201",
                   },
                   new Announcement
                   {
                       Title = "Announcement 8",
                       Date = DateTime.Now.AddMonths(6),
                       Description = "Announcement 6 months in future",
                       Category = "Exam",
                       Location = "Iulius Mall",
                       Room = "Parter",
                   },
                   new Announcement
                   {
                       Title = "Announcement 9",
                       Date = DateTime.Now.AddMonths(7),
                       Description = "Announcement 2 months ago",
                       Category = "Exam",
                       Location = "FSEGA",
                       Room = "342",
                   },
                   new Announcement
                   {
                       Title = "Announcement 10",
                       Date = DateTime.Now.AddMonths(8),
                       Description = "Announcement 8 months in future",
                       Category = "Conference",
                       Location = "FSEGA",
                       Room = "009",
                   }
                };

                context.Announcements.AddRange(announcements);
                context.SaveChanges();
            }
        }
    }
}