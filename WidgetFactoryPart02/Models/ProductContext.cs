using System.Data.Entity;

namespace TrainingWidgets.Models
{
    public class ProductContext : DbContext
    {
        public ProductContext() : base("Products") { }

        public DbSet<Product> Products { get; set; }

        public DbSet<Category> Categories { get; set; }
    }
}