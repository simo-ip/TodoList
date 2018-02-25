using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface ITodoService
    {
        Task<int> GetPageNumber();

        Task<IEnumerable<Todo>> GetData(int page);

        Task<Todo> GetById(int id);

        Task Create(Todo entity);

        Task Update(Todo entity);

        Task Delete(int id);
    }
}
