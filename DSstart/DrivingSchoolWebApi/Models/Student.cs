
using System.ComponentModel.DataAnnotations;

namespace DrivingSchoolWebApi.Models
{
    public class Student  : ENT
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public int OIB { get; set; }
        public long ContactNumber { get; set; }
        public DateTime DateOfEnrolment { get; set; }

    }
}
