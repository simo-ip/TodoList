using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoList.Angular.ViewModels
{
    public class TodoViewModel : ITodoViewModel
    {
        public int Pages { get; set; }
        public IEnumerable<Todo> TodoList { get; set; }

        public TodoViewModel ()
        {

        }
    }
}
