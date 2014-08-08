namespace MvcApplication1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class removedarray : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Expenses", "shared_by", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Expenses", "shared_by");
        }
    }
}
