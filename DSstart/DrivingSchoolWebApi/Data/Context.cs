using DrivingSchoolWebApi.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;

namespace DrivingSchoolWebApi.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options)
            : base(options)
        {

        }
        
        public DbSet<Instructor > Instructor { get; set; }
        public DbSet<Student> Student { get; set; }

        public DbSet<Vehicle> Vehicle { get; set; }

        public DbSet<Category> Category { get; set; }
    }
}
