using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.Data.SqlClient;

namespace DrivingSchoolWebApi.Models
{
    public class Course : ENT
    {


        [ForeignKey("Instructor")]
        public  Instructor? ID_INSTRUCTOR { get; set; }


        [ForeignKey("Vehicle")]
        public  Vehicle? ID_VEHICLE { get; set; }


        [ForeignKey("Category")]
        public Category? ID_CATEGORY { get; set; }


        public  DateTime START_DATE { get; set; }

        public List<Student> Students { get; set; } = new();




    }
}
