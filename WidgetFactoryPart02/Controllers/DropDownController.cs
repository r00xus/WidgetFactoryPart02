using System.Linq;
using System.Data.Entity;
using System.Web.Mvc;
using WidgetFactoryPart02.Lib;

namespace TrainingWidgets.Controllers
{
    public class DropDownController : BaseController
    {
        public ActionResult Category(string q)
        {
            var query = _db.Categories.AsQueryable();

            if (!string.IsNullOrWhiteSpace(q))
            {
                query = query.Where(x => x.Name.Contains(q));
            }

            var rows = query.ToList();

            return new JsonNetResult
            {
                Data = rows
            };
        }
    }
}