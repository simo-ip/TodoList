using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace TodoList.AspNetCoreMVC.Controllers
{
    public class AboutController : Controller
    {
        public IActionResult Index()
        {
            ViewData["Message"] = "Your application description page.";
            return View();
        }

        //public IActionResult Error()
        //{
        //    return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        //}
    }
}