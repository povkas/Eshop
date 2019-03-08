using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Eshop.Models;
using Eshop.Migrations;
using EntityModel = Eshop.Data;
using Microsoft.EntityFrameworkCore;
using Eshop.Data;
using Eshop.Service;

namespace Eshop.Controllers
{
    public class UserController : Controller
    {                    
        private IUserService _service;

        public UserController()
        {
            _service = new RegistrationService(this.ModelState, new EntityModel.Context());
        }

        public UserController(IUserService service)
        {
            _service = service;
        }


        public ActionResult Index()
        {            
            return View(_service.ListUsers());
        }

        public ActionResult Create() {
            return View();
        }
        [Route("api/[controller]")]
        [HttpPost]
        public ActionResult Create(User user)
        {
            if (!_service.CreateUser(user))
            {
                return View();
            }           
            return RedirectToAction("Index");
        }
    }
}