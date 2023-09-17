using JwtUser.Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Repository.Context
{
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
    
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Town> Towns { get; set; }
        public DbSet<Street> Streets { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<HowCarry> HowCarries { get; set; }
        public DbSet<Transport> Transports { get; set; }
        public DbSet<Cars> Cars { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<Appellation> Appellations { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<Personal> Personals { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<AppPersonel> AppPersonels { get; set; }
    }

}
