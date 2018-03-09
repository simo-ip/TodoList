using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataAccess.Entities;

using Services;

namespace TodoList.Angular.Controllers
{
    [Produces("application/json")]
    [Route("api/Todo")]
    public class TodoController : Controller
    {
        private readonly ITodoService _service;

        public TodoController( ITodoService service)
        {
            _service = service;
        }

        // GET: api/Todo
        [HttpGet("{id}")]
        public async Task<IEnumerable<Todo>> GetTodo([FromRoute] int id = 1)
        {
            return await _service.GetData(id);
        }

        // GET: api/Todo/5
        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetTodo([FromRoute] int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //
        //    var todo = await _context.Todo.SingleOrDefaultAsync(m => m.TodoId == id);
        //
        //    if (todo == null)
        //    {
        //        return NotFound();
        //    }
        //
        //    return Ok(todo);
        //}

        // PUT: api/Todo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodo([FromRoute] int id, [FromBody] Todo todo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != todo.TodoId)
            {
                return BadRequest();
            }

            
            try
            {
                await _service.Update(todo);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Todo
        [HttpPost]
        public async Task<IActionResult> PostTodo([FromBody] Todo todo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _service.Create(todo);

            return CreatedAtAction("GetTodo", new { id = todo.TodoId }, todo);
        }

        // DELETE: api/Todo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var todo = await _service.GetData(id);
            if (todo == null)
            {
                return NotFound();
            }

            await _service.Delete(id);

            return Ok(todo);
        }

        private bool TodoExists(int id)
        {
            return _service.GetById(id) != null ;
        }
    }
}