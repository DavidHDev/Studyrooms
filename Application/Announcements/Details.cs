using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application.Announcements
{
    public class Details
    {
        public class Query : IRequest<AnnouncementDTO>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AnnouncementDTO>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<AnnouncementDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                var announcement = await _context.Announcements
                .FindAsync(request.Id);

                if (announcement == null)
                    throw new RestException(HttpStatusCode.NotFound, new { announcement = "Not Found" });

                var announcementToReturn = _mapper.Map<Announcement, AnnouncementDTO>(announcement);

                return announcementToReturn;
            }
        }
    }
}