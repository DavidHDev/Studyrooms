using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Announcements
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Announcement, AnnouncementDTO>();
            CreateMap<UserAnnouncement, AttendeeDTO>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}