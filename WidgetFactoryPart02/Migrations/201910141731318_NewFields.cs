namespace TrainingWidgets.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NewFields : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Products", "Type", c => c.Int(nullable: false));
            AddColumn("dbo.Products", "WithDiscount", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Products", "WithDiscount");
            DropColumn("dbo.Products", "Type");
        }
    }
}
