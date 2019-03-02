using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using eShop_RegLog.Models;

namespace eShop_RegLog.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Index()
        {
            using (OurDbContext db = new OurDbContext())
            {
                return View(db.userAcount.ToList());
            }
        }

        public ActionResult Register()
        {
            return View();
        }
        [HttpPost]

        public ActionResult Register (UserAccount account)
        {
            if (ModelState.IsValid)
            {
                using (OurDbContext db = new OurDbContext())
                {
                    db.userAcount.Add(account);
                    db.SaveChanges();
                }
                ModelState.Clear();
                ViewBag.Message = account.FirstName + " " + account.LastName + " successfully registered. ";
            }
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]

        public ActionResult Login(UserAccount user)
        {
            using (OurDbContext db = new OurDbContext())
            {
                var usr = db.userAcount.Single(u => u.Email == user.Email && u.Password == user.Password);
                if (usr != null)
                {
                    this.Session["UserID"] = usr.UserID.ToString();
                    this.Session["Email"] = usr.Email.ToString();

                    return RedirectToAction("Logged in");
                }
                else
                {
                    ModelState.AddModelError("", "Username or password is incorect ");
                }
            }
            return View();
        }
        public ActionResult LoggedIn()
        {
            if (Session["UserID"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login");
            }
        }
    }
}