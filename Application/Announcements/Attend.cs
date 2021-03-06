using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Announcements
{
    public class Attend
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //handler logic
                var announcement = await _context.Announcements.FindAsync(request.Id);

                if (announcement == null)
                    throw new RestException(HttpStatusCode.NotFound, new {Announcement = "Could not find announcement."});

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var attendance = await _context.UserAnnouncements.SingleOrDefaultAsync(x => x.AnnouncementId == announcement.Id && x.AppUserId == user.Id);

                if(attendance != null)
                    throw new RestException(HttpStatusCode.BadRequest, new {Attendance = "Already an atendee."});

                attendance = new UserAnnouncement
                {
                    Announcement = announcement,
                    AppUser = user,
                    IsHost = false,
                    DateJoined = DateTime.Now
                };

                _context.UserAnnouncements.Add(attendance);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes.");
            }
        }
    }
}