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
        
        public DbSet<Instructor> Instructor { get; set; }

        public DbSet<Vehicle> Vehicle { get; set; }

        public DbSet<Category> Category { get; set; }

        public DbSet<Student> Student { get; set; }

        
        protected override void OnModelCreating(
           ModelBuilder modelBuilder)
        {
            //  1:n
            modelBuilder.Entity<Course>().HasOne(v => v.Vehicle);
            modelBuilder.Entity<Course>().HasOne(i => i.Instructor);
            modelBuilder.Entity<Course>().HasOne(c => c.Category);

            // n:n
            modelBuilder.Entity<Course>()
                .HasMany(s => s.Students)
                .WithMany(s => s.Courses)
                .UsingEntity<Dictionary<string, object>>("STUDENT_COURSE",
                sc => sc.HasOne<Student>().WithMany().HasForeignKey("ID_student"),
                sc => sc.HasOne<Course>().WithMany().HasForeignKey("ID_course"),
                sc => sc.ToTable("STUDENT_COURSE")
                );
        }
        
    }
}
