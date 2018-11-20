using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoList.Models
{
    public interface ITodoViewModel
    {
        int Pages { get; set; }
        int CurrentPage { get; set; }
        Todo Entity { get; set; }
        IEnumerable<Todo> List { get; set; }
    }
}
