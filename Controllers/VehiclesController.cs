using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApplication2.Controllers.Resources;
using WebApplication2.Core.Models;
using WebApplication2.Core;

namespace WebApplication2.Controllers
{
  [Route("/api/vehicles")]
  [ApiController]
  public class VehiclesController : ControllerBase
  {
    private readonly IMapper _mapper;
    private readonly IVehicleRepository _repository;
    private readonly IUnitOfWork _unitOfWork;
    public VehiclesController(IMapper mapper, IVehicleRepository repository, IUnitOfWork unitOfWork)
    {
      this._unitOfWork = unitOfWork;
      this._repository = repository;
      this._mapper = mapper;
    }

    [HttpPost]
    public async Task<IActionResult> CreateVehicle([FromBody] SaveVehicleResource vehicleResource)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var vehicle = _mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource);
      vehicle.LastUpdate = DateTime.Now;

      // _context.Vehicles.Add(vehicle);
      _repository.Add(vehicle);

      // await _context.SaveChangesAsync();
      await _unitOfWork.CompleteTransactionAsync();

      vehicle = await _repository.GetVehicleAsync(vehicle.Id);

      var result = _mapper.Map<Vehicle, VehicleResource>(vehicle);

      return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateVehicle(int id, [FromBody] SaveVehicleResource vehicleResource)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var vehicle = await _repository.GetVehicleAsync(id);

      if (vehicle == null)
      {
        return NotFound();
      }
      _mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource, vehicle);
      vehicle.LastUpdate = DateTime.Now;

      await _unitOfWork.CompleteTransactionAsync();

      vehicle = await _repository.GetVehicleAsync(vehicle.Id);

      var result = _mapper.Map<Vehicle, VehicleResource>(vehicle);

      return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteVehicle(int id)
    {
      var vehicle = await _repository.GetVehicleAsync(id, includeRelated: false);

      if (vehicle == null)
      {
        return NotFound();
      }


      _repository.Remove(vehicle);

      await _unitOfWork.CompleteTransactionAsync();
      return Ok();
    }


    [HttpGet("{id}")]
    public async Task<IActionResult> GetVehicle(int id)
    {
      var vehicle = await _repository.GetVehicleAsync(id);

      if (vehicle == null)
      {
        return NotFound();
      }

      var vehicleResource = _mapper.Map<Vehicle, VehicleResource>(vehicle);

      return Ok(vehicleResource);
    }

  }
}
