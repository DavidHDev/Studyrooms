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
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id = "a",
                        DisplayName = "David",
                        UserName = "davidh",
                        Email = "david@test.com"
                    },
                    new AppUser
                    {
                        Id = "b",
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        Id = "c",
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (!context.Announcements.Any())
            {
                var announcements = new List<Announcement>
                {
                    new Announcement
                    {
                        Title = "Past Announcement 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Announcement 2 months ago",
                        Category = "Lecture",
                        Location = "FSEGA",
                        Room = "422",
                        UserAnnouncements = new List<UserAnnouncement>
                        {
                            new UserAnnouncement
                            {
                                AppUserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(-2)
                            }
                        }
                    },
                    new Announcement
                    {
                        Title = "Past Announcement 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Announcement 1 month ago",
                        Category = "Conference",
                        Location = "Cluj Hub",
                        Room = "Main Hall",
                        UserAnnouncements = new List<UserAnnouncement>
                        {
                            new UserAnnouncement
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(-1)
                            },
                            new UserAnnouncement
                            {
                                AppUserId = "a",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(-1)
                            },
                        }
                    },
                    new Announcement
                    {
                        Title = "Future Announcement 1",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Announcement 1 month in future",
                        Category = "Online",
                        Location = "FSEGA",
                        Room = "Zoom Id",
                        UserAnnouncements = new List<UserAnnouncement>
                        {
                            new UserAnnouncement
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(1)
                            },
                            new UserAnnouncement
                            {
                                AppUserId = "a",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(1)
                            },
                        }
                    },
                    new Announcement
                    {
                        Title = "Future Announcement 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Announcement 2 months in future",
                        Category = "Workshop",
                        Location = "FSEGA",
                        Room = "211",
                        UserAnnouncements = new List<UserAnnouncement>
                        {
                            new UserAnnouncement
                            {
                                AppUserId = "c",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(2)
                            },
                            new UserAnnouncement
                            {
                                AppUserId = "a",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(2)
                            },
                        }
                    },
                    new Announcement
                    {
                        Title = "Future Announcement 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Announcement 3 months in future",
                        Category = "Lecture",
                        Location = "FSEGA",
                        Room = "419",
                        UserAnnouncements = new List<UserAnnouncement>
                        {
                            new UserAnnouncement
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(3)
                            },
                            new UserAnnouncement
                            {
                                AppUserId = "c",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(3)
                            },
                        }
                    },
                    new Announcement
                    {
                        Title = "Future Announcement 4",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Announcement 4 months in future",
                        Category = "Conference",
                        Location = "FSEGA",
                        Room = "442",
                        UserAnnouncements = new List<UserAnnouncement>
                        {
                            new UserAnnouncement
                            {
                                AppUserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(4)
                            }
                        }
                    },
                    new Announcement
                    {
                        Title = "Future Announcement 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Announcement 5 months in future",
                        Category = "Lecture",
                        Location = "FSEGA",
                        Room = "313",
                        UserAnnouncements = new List<UserAnnouncement>
                        {
                            new UserAnnouncement
                            {
                                AppUserId = "c",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(5)
                            },
                            new UserAnnouncement
                            {
                                AppUserId = "b",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(5)
                            },
                        }
                    },
                    new Announcement
                    {
                        Title = "Future Announcement 6",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Announcement 6 months in future",
                        Category = "Online",
                        Location = "FSEGA",
                        Room = "O22",
                        UserAnnouncements = new List<UserAnnouncement>
                        {
                            new UserAnnouncement
                            {
                                AppUserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(6)
                            },
                            new UserAnnouncement
                            {
                                AppUserId = "b",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(6)
                            },
                        }
                    },
                    new Announcement
                    {
                        Title = "Future Announcement 7",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Announcement 7 months in future",
                        Category = "Conference",
                        Location = "Cluj Hub",
                        Room = "Conference Room",
                        UserAnnouncements = new List<UserAnnouncement>
                        {
                            new UserAnnouncement
                            {
                                AppUserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(7)
                            },
                            new UserAnnouncement
                            {
                                AppUserId = "c",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(7)
                            },
                        }
                    },
                    new Announcement
                    {
                        Title = "Future Announcement 8",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Announcement 8 months in future",
                        Category = "Lecture",
                        Location = "FSEGA",
                        Room = "001",
                        UserAnnouncements = new List<UserAnnouncement>
                        {
                            new UserAnnouncement
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(8)
                            },
                            new UserAnnouncement
                            {
                                AppUserId = "a",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(8)
                            },
                        }
                    }
                };

                await context.Announcements.AddRangeAsync(announcements);
                await context.SaveChangesAsync();
            }
        }
    }
}