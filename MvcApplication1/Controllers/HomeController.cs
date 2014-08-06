using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MvcApplication1.Models;
using System.Net.Http;
namespace MvcApplication1.Controllers
{
    public class HomeController : Controller
    {
        private RegistrationContext db = new RegistrationContext();
        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View();
        }
        public ActionResult registrations()
        {
            return Json(db.Registrations.ToList(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult register(string name, string salutation, string age)
        {
            Registrations r = new Registrations
            {
                salutation = salutation,
                age = Convert.ToInt32(age),
                name = name,
            };

            db.Registrations.Add(r);
            db.SaveChanges();
            return Json(null, JsonRequestBehavior.AllowGet);
        }

    }
}
