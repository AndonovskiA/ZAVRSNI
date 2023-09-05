using System.ComponentModel.DataAnnotations;


namespace DrivingSchoolWebApi.Models
{
    public class Instructor : ENT
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int DriverLicenceNumber { get; set; }
        public string EMail { get; set; }
        public long ContactNumber { get; set; }
    }
}
