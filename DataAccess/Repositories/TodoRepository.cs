using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class TodoRepository : GenericRepository<Todo>, ITodoRepository
    {
        public TodoRepository(TodoListContext dbContext)
        : base(dbContext)
        {

        }
    }
}
