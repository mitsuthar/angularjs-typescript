using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MvcApplication1.Models
{
    public class Registrations
    {
         public int ID { get; set; }
         public string salutation { get; set; } 
         public string name { get; set; }
         public int age { get; set; }
         public string username { get; set; }
    }
    public class Expenses
    {
        public int ID { get; set; }
        public decimal amount { get; set; }
        public string description { get; set; } 
        public string[] shared_by; 
        public string edate;
        public string username { get; set; }
    }
    public class RegistrationContext : DbContext
    {
        public DbSet<Registrations> Registrations { get; set; }
        public DbSet<Expenses> Expenses { get; set; }
    }
}