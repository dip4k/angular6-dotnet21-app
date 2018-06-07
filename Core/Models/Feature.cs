using System.ComponentModel.DataAnnotations;

namespace WebApplication2.Core.Models
{
  public class Feature
  {
    public int Id { get; set; }

    [Required]
    [StringLength(255)]
    public string Name { get; set; }
  }
}
