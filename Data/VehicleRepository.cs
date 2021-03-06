using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Core;
using WebApplication2.Core.Models;

namespace WebApplication2.Data
{
  public class VehicleRepository : IVehicleRepository
  {
    private readonly VegaDbContext _context;
    public VehicleRepository(VegaDbContext context)
    {
      this._context = context;

    }
    public async Task<Vehicle> GetVehicleAsync(int id, bool includeRelated = true)
    {
      if (!includeRelated)
      {
        return await _context.Vehicles.FindAsync(id);
      }
      return await _context.Vehicles
        .Include(v => v.Features)
            .ThenInclude(vf => vf.Feature)
        .Include(v => v.Model).ThenInclude(m => m.Make)
        .SingleOrDefaultAsync(v => v.Id == id);
    }

    public void Add(Vehicle vehicle)
    {
      _context.Vehicles.Add(vehicle);
    }

    public void Remove(Vehicle vehicle)
    {
      _context.Remove(vehicle);

    }

    public async Task<IEnumerable<Vehicle>> GetVehiclesAsync()
    {
      return await _context.Vehicles
        .Include(v => v.Model).ThenInclude(m => m.Make)
        .Include(v => v.Features).ThenInclude(vf => vf.Feature)
        .ToListAsync();
    }
  }
}
