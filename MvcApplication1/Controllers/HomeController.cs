﻿using System;
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
            if (User.Identity.IsAuthenticated)
            {
                return View();
            }
            else
            {
                return Redirect("/Account/Login");
            }
            
        }

        public ActionResult registrations()
        {
            string current_username = User.Identity.Name;
            return Json(db.Registrations.Where(r => r.username == current_username).ToList(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult expenses()
        {
            string current_username = User.Identity.Name;
            return Json(db.Expenses.Where(r => r.username == current_username).ToList(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult users()
        {
            string current_username = User.Identity.Name;
            return Json(db.Registrations.Where(r => r.username == current_username).Select(s => s.name).ToList(), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult register(string name, string salutation, string age)
        {
            Registrations r = new Registrations
            {
                salutation = salutation,
                age = Convert.ToInt32(age),
                name = name,
                username = User.Identity.Name
            };

            db.Registrations.Add(r);
            db.SaveChanges();
            return Json(null, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult expense(string[] shared_by, string amount, string description)
        {
            Expenses e = new Expenses
            {
                description = description,
                amount = Convert.ToDecimal(amount),
                shared_by = shared_by,
                username = User.Identity.Name,
                edate = DateTime.Now.ToString("yyyy-mm-dd")
            };

            db.Expenses.Add(e);
            db.SaveChanges();
            return Json(null, JsonRequestBehavior.AllowGet);
        }

    }
}
