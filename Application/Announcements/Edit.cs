using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Announcements
{
    public class Edit
    {
        public class Command : IRequest
                {
                    public Guid Id { get; set; }
                    public string Title { get; set; }
                    public string Description { get; set; }
                    public string Category { get; set;}
                    public DateTime? Date { get; set; }
                    public string Location { get; set; }
                    public string Room { get; set; }
                }
                public class Handler : IRequestHandler<Command>
                {
                    private readonly DataContext _context;
                    public Handler(DataContext context)
                    {
                        _context = context;
                    }
        
                    public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
                    {
                        //handler logic

                        var announcement = await _context.Announcements.FindAsync(request.Id);

                        if (announcement == null)
                            throw new Exception("Could not find announcement.");

                        announcement.Title = request.Title ?? announcement.Title;
                        announcement.Description = request.Description ?? announcement.Description;
                        announcement.Category = request.Category ?? announcement.Category;
                        announcement.Date = request.Date ?? announcement.Date;
                        announcement.Location = request.Location ?? announcement.Location;
                        announcement.Room = request.Room ?? announcement.Room;

                        var success = await _context.SaveChangesAsync() > 0; 
        
                        if (success) return Unit.Value;
        
                        throw new Exception("Problem saving changes.");
                    }
                }
    }
}