namespace TrainingWidgets.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RowVersion : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Categories", "RowVersion", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
            AddColumn("dbo.Products", "RowVersion", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Products", "RowVersion");
            DropColumn("dbo.Categories", "RowVersion");
        }
    }
}
