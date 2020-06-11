using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Value> Values { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<UserAnnouncement> UserAnnouncements { get; set;}        protected override void OnModelCreating(ModelBuilder builder){

            base.OnModelCreating(builder);

            builder.Entity<Value>().HasData(
                new Value { Id = 1, Name = "Value 0" },
                new Value { Id = 2, Name = "Value 1" },
                new Value { Id = 3, Name = "Value 2" }
            );

            builder.Entity<UserAnnouncement>(x => x.HasKey(ua => new {ua.AppUserId, ua.AnnouncementId}));
            
            builder.Entity<UserAnnouncement>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.UserAnnouncements)
                .HasForeignKey(u => u.AppUserId);
            
            builder.Entity<UserAnnouncement>()
                .HasOne(a => a.Announcement)
                .WithMany(u => u.UserAnnouncements)
                .HasForeignKey(a => a.AnnouncementId);
        }
    }
}
