using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using WebApplication2.Controllers.Resources;
using WebApplication2.Models;

namespace WebApplication2.Mapping
{
    public class MappingProfile : Profile
    {
      public MappingProfile()
      {
        CreateMap<Make, MakeResource>();
        CreateMap<Model, ModelResource>();
        CreateMap<Feature, FeatureResource>();
      }
    }
}
