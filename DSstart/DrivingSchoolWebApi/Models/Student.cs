namespace DrivingSchoolWebApi.Models
{
    public class Student : ENT
    {
        public string FIRST_NAME { get; set; }
        public string LAST_NAME { get; set; }
        public string? ADDRESS { get; set; }
        public string OIB { get; set; }
        public string CONTACT_NUMBER { get; set; }
        public DateTime DATE_OF_ENROLLMENT { get; set; }

        public ICollection<Course> Courses { get; } = new List<Course>();

        
    }
}
