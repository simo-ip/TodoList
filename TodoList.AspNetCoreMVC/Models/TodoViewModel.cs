using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoList.Models
{
    public class TodoViewModel : ITodoViewModel
    {
        public int Pages { get; set; }
        public int CurrentPage { get; set; }
        public Todo Entity { get; set; }
        public IEnumerable<Todo> List { get; set; }
    }
}
