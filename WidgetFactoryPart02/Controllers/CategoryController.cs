using Antlr.Runtime.Misc;
using System.Linq;
using System.Web.Mvc;
using TrainingWidgets.Lib;
using TrainingWidgets.Models;
using WidgetFactoryPart02.Lib;

namespace TrainingWidgets.Controllers
{
    public class CategoryController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        /// <summary> Список категорий </summary>
        public ActionResult List(int? rows, int? page)
        {
            IQueryable<Category> query = _db.Categories.OrderByDescending(x => x.Id);

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

        /// <summary> Создание категории (форма) </summary>
        public ActionResult Create()
        {
            return Create<Category>(afterCreate: x => { x.Name = "Новая категория"; });
        }

        /// <summary> Создание категории </summary>
        [HttpPost]
        [ActionName("Create")]
        public ActionResult CreatePost([Bind(Include = "Code,Name")] Category model)
        {
            return CreatePost(model, _db.Categories);
        }

        /// <summary> Изменение категории (форма) </summary>
        public ActionResult Edit(long id)
        {
            return Edit(id, _db.Categories);
        }

        /// <summary> Изменение категории </summary>
        [HttpPost]
        [ActionName("Edit")]
        public ActionResult EditPost(long id)
        {
            return EditPost(id, _db.Categories, new string[] { "Code", "Name", "RowVersion" });
        }

        /// <summary> Удаление категории </summary>
        [HttpPost]
        public ActionResult Delete(long id)
        {
            return DeletePost(id, _db.Categories);
        }
    }
}