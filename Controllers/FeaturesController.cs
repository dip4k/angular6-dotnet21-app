using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Controllers.Resources;
using WebApplication2.Models;
using WebApplication2.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication2.Controllers
{
    
    public class FeaturesController : Controller
    {
    private readonly VegaDbContext _context;
    private readonly IMapper _mapper;

    public FeaturesController(VegaDbContext context,IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    [HttpGet("/api/features")]
    public async Task<IEnumerable<FeatureResource>> GetFeatures()
    {
      var features = await _context.Features.ToListAsync();
      return _mapper.Map<List<Feature>, List<FeatureResource>>(features);
    } 
    }
}
