using Microsoft.EntityFrameworkCore;
using DataAccess.Entities;

namespace DataAccess
{
    public class TodoListContext : DbContext
    {
        public TodoListContext (DbContextOptions<TodoListContext> options)
            : base(options)
        {
        }

        public DbSet<Todo> Todo { get; set; }
    }
}
