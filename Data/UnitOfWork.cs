using System.Threading.Tasks;
using WebApplication2.Core;

namespace WebApplication2.Data
{
  public class UnitOfWork : IUnitOfWork
  {
    private readonly VegaDbContext _context;

    public UnitOfWork(VegaDbContext context)
    {
      _context = context;
    }

    public async Task CompleteTransactionAsync()
    {
      await _context.SaveChangesAsync();
    }
  }
}
