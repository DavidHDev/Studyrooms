using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Announcements
{
    public class Details
    {
        public class Query : IRequest<Announcement>
        {
            public Guid Id { get; set; }
        }

        public class Handleer : IRequestHandler<Query, Announcement>
        {
            private readonly DataContext _context;
            public Handleer(DataContext context)
            {
                _context = context;
            }

            public async Task<Announcement> Handle(Query request, CancellationToken cancellationToken)
            {
                var announcement = await _context.Announcements.FindAsync(request.Id);

                return announcement;
            }
        }
    }
}