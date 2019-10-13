using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TrainingWidgets.Controllers
{
    public class PanelController : Controller
    {
        public ActionResult CategoryDialog()
        {
            return PartialView("~/Views/Category/Partial/_datagridCrudCategoryDialog.cshtml");
        }

        public ActionResult ProductDialog()
        {
            return PartialView("~/Views/Product/Partial/_datagridCrudProductDialog.cshtml");
        }

        public ActionResult ProductBoth()
        {
            return PartialView("~/Views/Home/Partial/_panelBoth.cshtml");
        }

    }
}