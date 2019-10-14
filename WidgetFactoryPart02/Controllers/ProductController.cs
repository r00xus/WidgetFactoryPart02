using System.Linq;
using System.Web.Mvc;
using TrainingWidgets.Lib;
using TrainingWidgets.Models;
using WidgetFactoryPart02.Lib;

namespace TrainingWidgets.Controllers
{
    public class ProductController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        /// <summary> Список продуктов </summary>
        public ActionResult List(int? rows, int? page)
        {
            IQueryable<Product> query = _db.Products.OrderByDescending(x => x.Id);

            var pagedQuery = query;

            if (page != null && rows != null)
                pagedQuery = pagedQuery.ToPagedQueryable((int)page, (int)rows);

            var result = pagedQuery.ToList();

            return new JsonNetResult
            {
                Data = new
                {
                    total = query.Count(),
                    rows = result
                }
            };
        }

        /// <summary> Создание (форма) </summary>
        public ActionResult Create()
        {
            return Create<Product>();
        }

        /// <summary> Создание </summary>
        [HttpPost, ActionName("Create")]
        public ActionResult CreatePost([Bind(Include = "Code,Name,CategoryId,Type,WithDiscount")] Product model)
        {
            return CreatePost(model, _db.Products);
        }

        /// <summary> Изменение (форма) </summary>
        public ActionResult Edit(long id)
        {
            return Edit(id, _db.Products);
        }

        /// <summary> Изменение </summary>
        [HttpPost, ActionName("Edit")]
        public ActionResult EditPost(long id)
        {
            return EditPost(id, _db.Products, new string[] { "Code", "Name", "CategoryId", "Type", "WithDiscount", "RowVersion" });
        }

        /// <summary> Удаление </summary>
        [HttpPost]
        public ActionResult Delete(long id)
        {
            return DeletePost(id, _db.Products);
        }
    }
}