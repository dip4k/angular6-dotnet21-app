using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Models;
using WebApplication2.Data;
using AutoMapper;
using WebApplication2.Controllers.Resources;

namespace WebApplication2.Controllers
{
    public class MakesController : ControllerBase
  {
    private readonly VegaDbContext context;
    private readonly IMapper _mapper;

    public MakesController(VegaDbContext context, IMapper mapper)
    {
      
      this.context = context;
      _mapper = mapper;
    }

    [HttpGet("/api/makes")]
    public async Task<IEnumerable<MakeResource>> GetMakes()
    {
      var makes = await context.Makes.Include(m => m.Models).ToListAsync();

      return _mapper.Map<List<Make>, List<MakeResource>>(makes);
    }
  }
}
