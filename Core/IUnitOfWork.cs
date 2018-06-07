using System.Threading.Tasks;

namespace WebApplication2.Core
{
  public interface IUnitOfWork
  {
    Task CompleteTransactionAsync();
  }
}
