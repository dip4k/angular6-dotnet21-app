using System.Threading.Tasks;
using WebApplication2.Core.Models;

namespace WebApplication2.Core
{
  public interface IVehicleRepository
  {
    Task<Vehicle> GetVehicleAsync(int id, bool includeRelated = true);

    void Add(Vehicle vehicle);

    void Remove(Vehicle vehicle);
  }
}
