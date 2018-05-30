using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace WebApplication2.Models
{
  public class Make
  {
    public int Id { get; set; }

    [Required]
    [StringLength(255)]
    public string Name { get; set; }

    public ICollection<Model> Models { get; set; }

    public Make()
    {
      this.Models = new Collection<Model>();
    }
  }
}
