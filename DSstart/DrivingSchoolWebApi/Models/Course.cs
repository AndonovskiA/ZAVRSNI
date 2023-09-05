namespace DrivingSchoolWebApi.Models
{
    public class Course : ENT
    {
        public DateTime StartDate { get; set; }

        public int InstructorId { get; set; } 

        public int StudentId { get; set; }

        public int VehicleId { get; set; }

        public int CategoryId { get; set; }
    }
}
