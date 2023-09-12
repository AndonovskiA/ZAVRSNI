using System.ComponentModel.DataAnnotations.Schema;

namespace DrivingSchoolWebApi.Models
{
    public class Course : ENT
    {



        [ForeignKey("instructor")]
        public  Instructor Instructor { get; set; }
        [ForeignKey("vehicle")]
        public  Vehicle Vehicle { get; set; }

        [ForeignKey("category")]
        public Category Category { get; set; } 

        public  DateTime START_DATE { get; set; }

        public List<Student> Students { get; set; } = new();




    }
}
