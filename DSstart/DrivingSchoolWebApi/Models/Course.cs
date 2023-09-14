using System.ComponentModel.DataAnnotations.Schema;

namespace DrivingSchoolWebApi.Models
{
    public class Course : ENT
    {


        [ForeignKey("Instructor")]
        public  Instructor?  ID_Instructor { get; set; }


        [ForeignKey("Vehicle")]
        public  Vehicle? ID_Vehicle { get; set; }


        [ForeignKey("Category")]
        public Category? ID_Category { get; set; } 


        public  DateTime START_DATE { get; set; }

        public List<Student> Students { get; set; } = new();




    }
}
