using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoList.Knockout.ViewModels
{
    public interface ITodoViewModel
    {
        int Pages { get; set; }
        IEnumerable<Todo> TodoList { get; set; }
    }
}
