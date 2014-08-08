namespace MvcApplication1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class getsetadded : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Expenses", "edate", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Expenses", "edate");
        }
    }
}
