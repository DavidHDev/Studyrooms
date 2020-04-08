using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Announcements
{
    public class List
    {
        public class Query : IRequest<List<Announcement>> { }

        public class Handler : IRequestHandler<Query, List<Announcement>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Announcement>> Handle(Query request, CancellationToken cancellationToken)
            {

                var announcements = await _context.Announcements.ToListAsync();

                return announcements;
            }
        }
    }
}