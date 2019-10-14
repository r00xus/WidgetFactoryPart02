using System.Web.Optimization;

namespace TrainingWidgets
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/lib")
                .Include("~/Scripts/app/_lib/widgets/comboCategory.js")
                .Include("~/Scripts/app/_lib/widgets/comboProductType.js")
                .Include("~/Scripts/app/_lib/widgets/windowBase.js")
                .Include("~/Scripts/app/_lib/widgets/dialogBase.js")
                .Include("~/Scripts/app/_lib/widgets/datagridCrudBase.js"));


            bundles.Add(new ScriptBundle("~/bundles/category")
                .Include("~/Scripts/app/category/dialogCategory.js")
                .Include("~/Scripts/app/category/datagridCategoryDialog.js"));

            bundles.Add(new ScriptBundle("~/bundles/product")
                .Include("~/Scripts/app/product/dialogProduct.js")
                .Include("~/Scripts/app/product/datagridProductDialog.js"));


            bundles.Add(new ScriptBundle("~/bundles/home")
                .Include("~/Scripts/app/home/panelBoth.js")
                .Include("~/Scripts/app/home/Home.js"));
        }
    }
}
