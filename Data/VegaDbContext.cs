using Microsoft.EntityFrameworkCore;
using WebApplication2.Models;


namespace WebApplication2.Data
{
  public class VegaDbContext : DbContext
  {
    public VegaDbContext(DbContextOptions<VegaDbContext> options)
     : base(options)
    {
    }

    public DbSet<Make> Makes { get; set; }
    public DbSet<Feature> Features { get; set; }
  }
}
