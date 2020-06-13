using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListAnnouncements
    {
        public class Query : IRequest<List<UserActivityDTO>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<UserActivityDTO>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<UserActivityDTO>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { User = "Not found" });

                var queryable = user.UserAnnouncements
                    .OrderBy(a => a.Announcement.Date)
                    .AsQueryable();

                switch (request.Predicate)
                {
                    case "past":
                        queryable = queryable.Where(a => a.Announcement.Date <= DateTime.Now);
                        break;
                    case "hosting":
                        queryable = queryable.Where(a => a.IsHost);
                        break;
                    default:
                        queryable = queryable.Where(a => a.Announcement.Date >= DateTime.Now);
                        break;
                }

                var announcements = queryable.ToList();
                var announcementsToReturn = new List<UserActivityDTO>();

                foreach (var announcement in announcements)
                {
                    var userAnnouncement = new UserActivityDTO
                    {
                        Id = announcement.Announcement.Id,
                        Title = announcement.Announcement.Title,
                        Category = announcement.Announcement.Category,
                        Date = announcement.Announcement.Date
                    };

                    announcementsToReturn.Add(userAnnouncement);
                }

                return announcementsToReturn;
            }
        }
    }
}