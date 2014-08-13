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
        [HttpGet]
        public ActionResult delete_r(string id)
        {
            db.Registrations.Remove(db.Registrations.Find(Convert.ToInt32(id)));
            db.SaveChanges();
            return Json(null,JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult delete_e(string id)
        {
            db.Expenses.Remove(db.Expenses.Find(Convert.ToInt32(id)));
            db.SaveChanges();
            return Json(null,JsonRequestBehavior.AllowGet);
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
        public ActionResult invoice()
        {
            string current_username = User.Identity.Name;
            var _users = db.Registrations.Where(r => r.username == current_username).Select(s => s.name).ToList();
            _users.Add("me");
            var users = _users.ToArray();
            var expenses = db.Expenses.Where(r => r.username == current_username).ToList();
            float[] amounts = new float[users.Length];
            float[] amounts_p = new float[users.Length];
            Array.Clear(amounts,0,amounts.Length);
            for(var counter = 0; counter < expenses.Count; counter ++)
            {
                var shared_by = expenses[counter].shared_by;
                string[] s_users = shared_by.Split(',');
                float s_amount = (float)Math.Round((decimal)expenses[counter].amount/s_users.Length);
                try
                {
                    int _index = Array.IndexOf(users, expenses[counter].paid_by.Trim());
                    amounts_p[_index] = amounts_p[_index] + (float)Math.Round((decimal)expenses[counter].amount,2);
                }
                catch
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
                foreach(string user in s_users)
                {
                    try
                    {
                        int index = Array.IndexOf(users, user.Trim());
                        amounts[index] = amounts[index] + s_amount;
                    }
                    catch
                    {
                        return Json(null, JsonRequestBehavior.AllowGet);
                    }
                }
            }
            return Json(new {users=users,amounts=amounts,amounts_p=amounts_p}, JsonRequestBehavior.AllowGet);
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
        public ActionResult expense(string[] shared_by, string amount, string description, string paid_by)
        {
            Expenses e = new Expenses
            {
                description = description,
                amount = Convert.ToDecimal(amount),
                shared_by = String.Join(",",shared_by),
                username = User.Identity.Name,
                edate = DateTime.Now.ToString("yyyy-mm-dd"),
                paid_by = paid_by
            };

            db.Expenses.Add(e);
            db.SaveChanges();
            return Json(null, JsonRequestBehavior.AllowGet);
        }

    }
}
