using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Announcements
{
    public class Delete
    {
        public class Command : IRequest
                {
                   public Guid Id { get; set; }
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

                        if(announcement == null)
                            throw new Exception("Could not find announcement");

                        _context.Remove(announcement);

                        var success = await _context.SaveChangesAsync() > 0; 
        
                        if (success) return Unit.Value;
        
                        throw new Exception("Problem saving changes.");
                    }
                }
    }
}