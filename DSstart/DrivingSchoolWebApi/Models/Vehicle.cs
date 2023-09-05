using System.ComponentModel.DataAnnotations;


namespace DrivingSchoolWebApi.Models
{
    public class Vehicle : ENT
    {
        public string Type { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public DateTime PurchaseDate { get; set; }
        public DateTime RegistrationDate { get; set; }
    }
}
