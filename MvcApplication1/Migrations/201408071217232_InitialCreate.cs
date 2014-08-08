namespace MvcApplication1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Registrations",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        salutation = c.String(),
                        name = c.String(),
                        age = c.Int(nullable: false),
                        username = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Expenses",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        amount = c.Decimal(nullable: false, precision: 18, scale: 2),
                        description = c.String(),
                        username = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Expenses");
            DropTable("dbo.Registrations");
        }
    }
}
