namespace DrivingSchoolWebApi.Models.DTO
{
    public class CourseDTO
    {
        public  int ID { get; set; }

        public  int Number_of_students { get; set; }

        public DateTime START_DATE { get; set; }

        public  int  IDCategory { get; set; }
        public  int IDInstructor { get; set; }
        public int IDVehicle { get; set; }
    }
}
