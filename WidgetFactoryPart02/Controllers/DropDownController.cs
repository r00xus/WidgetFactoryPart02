using System.Linq;
using System.Web.Mvc;
using WidgetFactoryPart02.Lib;
using System.Collections.Generic;
using TrainingWidgets.Models;

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

        public ActionResult ProductTypes()
        {
            return new JsonNetResult
            {
                Data = new List<object>
                {
                    new
                    {
                        value = ((int)ProductType.Internal).ToString(),
                        text = ProductType.Internal.Name()
                    },
                    new
                    {
                        value = ((int)ProductType.External).ToString(),
                        text = ProductType.External.Name()
                    },
                }
            };
        }
    }
}