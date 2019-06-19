using System.Web.Optimization;

namespace TrainingWidgets
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/lib")
                .Include("~/Scripts/app/_lib/widgets/comboCategory.js")
                .Include("~/Scripts/app/_lib/widgets/windowBase.js")
                .Include("~/Scripts/app/_lib/widgets/dialogBase.js")
                .Include("~/Scripts/app/_lib/widgets/datagridCrudBase.js")
                .Include("~/Scripts/app/_lib/widgets/datagridCrudDialogBase.js")
                .Include("~/Scripts/app/_lib/widgets/datagridCrudInlineBase.js"));


            bundles.Add(new ScriptBundle("~/bundles/category")
                .Include("~/Scripts/app/category/dialogCategory.js")
                .Include("~/Scripts/app/category/datagridCategoryDialog.js")
                .Include("~/Scripts/app/category/datagridCategoryInline.js"));

            bundles.Add(new ScriptBundle("~/bundles/product")
                .Include("~/Scripts/app/product/dialogProduct.js")
                .Include("~/Scripts/app/product/datagridProductDialog.js")
                .Include("~/Scripts/app/product/datagridProductInline.js"));


            bundles.Add(new ScriptBundle("~/bundles/home")
                .Include("~/Scripts/app/home/panelBoth.js")
                .Include("~/Scripts/app/home/Home.js"));
        }
    }
}
