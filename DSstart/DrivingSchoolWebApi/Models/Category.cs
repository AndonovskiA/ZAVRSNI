
using System.ComponentModel.DataAnnotations;

namespace DrivingSchoolWebApi.Models
{
    public class Category : ENT
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int NumberOfTRLectures { get; set; }
        public int NumberOfDrivingLectures { get; set; }

       
    }
}
