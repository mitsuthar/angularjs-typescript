namespace MvcApplication1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedpaidby : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Expenses", "paid_by", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Expenses", "paid_by");
        }
    }
}
