using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataAccess.Entities;
using TodoList.Models;
using Services;
using System.Linq;
using System;

namespace TodoList.AspNetCoreMVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly ITodoViewModel _model;
        private readonly ITodoService _service;

        public HomeController( ITodoService service, ITodoViewModel model)
        {
            _service = service;
            _model = model;
        }

        public async Task<IActionResult> List(int? id = 1)
        {
            ViewBag.Pages = await _service.GetPageNumber();
            ViewBag.CurrentPage = id;
            _model.List = await _service.GetData(id.GetValueOrDefault());
            if (TempData["errorMsg"] != null)
            {
                ViewData["errorMsg"] = TempData["errorMsg"];
            }
            return View(_model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("TodoId,Description,IsDone")] Todo todo)
        {
            if (ModelState.IsValid)
            {
                await _service.Create(todo);
                return RedirectToAction(nameof(List));
            }
            var errors =ModelState.Values.SelectMany(x => x.Errors);
            string err = String.Empty;
            foreach(var e in errors)
            {
                err += e.ErrorMessage;
            }
            TempData["errorMsg"] = err;
            return RedirectToAction(nameof(List));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit( string submitButton, [Bind("TodoId,Description,IsDone")] Todo todo)
        {
            switch(submitButton)
            {
                case "Save":
                    {
                        return await Update(todo);
                    }
                case "Delete":
                    {
                        return await Delete(todo.TodoId);
                    }
                default:
                    {
                        return RedirectToAction(nameof(List));
                    }
            }
        }

        private async Task<IActionResult> Update(Todo todo)
        {


            if (ModelState.IsValid)
            {
                try
                {
                    await _service.Update(todo);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TodoExists(todo.TodoId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return Redirect(HttpContext.Request.Headers["Referer"]);
            }
            return Redirect(HttpContext.Request.Headers["Referer"]);
        }

        private async Task<IActionResult> Delete(int id)
        {
            await _service.Delete(id);
            return Redirect(HttpContext.Request.Headers["Referer"]);
        }

        private bool TodoExists(int id)
        {
            return _service.GetById(id) != null;
        }
    }
}
