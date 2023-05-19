using CiCiLibrary.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CiCiLibrary.Controllers
{
    public class BookController : Controller
    {
        private BookContext db = new BookContext();

        public ActionResult Index()
        {
            var books = db.Books.Include(b => b.Author).Include(b => b.Publisher).ToList();
            return View(books);
        }

        //Get
        public ActionResult Create()
        {
            ViewBag.Authors = new SelectList(db.Authors, "Id", "Name");
            ViewBag.Publishers = new SelectList(db.Publishers, "Id", "Name");
            return PartialView("_Create");
        }

        [HttpPost]
        public ActionResult Create(Book book)
        {
            if (ModelState.IsValid)
            {
                db.Books.Add(book);
                db.SaveChanges();
                return Json(new { success = true });
            }
            return PartialView("_Create", book);
        }

        //Get
        public ActionResult Edit(int id)
        {
            var book = db.Books.Find(id);
            if (book == null)
            {
                return HttpNotFound();
            }
            ViewBag.Authors = new SelectList(db.Authors, "Id", "Name", book.AuthorId);
            ViewBag.Publishers = new SelectList(db.Publishers, "Id", "Name", book.PublisherId);
            return PartialView("_Edit", book);
        }

        [HttpPost]
        public ActionResult Edit(Book book)
        {
            if (ModelState.IsValid)
            {
                db.Entry(book).State = EntityState.Modified;
                db.SaveChanges();
                return Json(new { success = true });
            }
            return PartialView("_Edit", book);
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            var book = db.Books.Find(id);
            if (book == null)
            {
                return HttpNotFound();
            }
            db.Books.Remove(book);
            db.SaveChanges();
            return Json(new { success = true });
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }

}