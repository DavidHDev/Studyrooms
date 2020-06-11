using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Announcements
{
    public class List
    {
        public class Query : IRequest<List<AnnouncementDTO>> { }

        public class Handler : IRequestHandler<Query, List<AnnouncementDTO>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<AnnouncementDTO>> Handle(Query request, CancellationToken cancellationToken)
            {

                var announcements = await _context.Announcements
                .ToListAsync();

                return _mapper.Map<List<Announcement>, List<AnnouncementDTO>>(announcements);
            }
        }
    }
}