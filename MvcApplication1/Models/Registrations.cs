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
    }
    public class RegistrationContext : DbContext
    {
        public DbSet<Registrations> Registrations { get; set; }

    }
}