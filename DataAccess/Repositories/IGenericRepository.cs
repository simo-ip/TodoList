using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        IQueryable<TEntity> GetAll();

        Task<TEntity> GetById(int id);

        Task Create(TEntity entity);

        Task Update(TEntity entity);

        Task Delete(int id);
    }
}
