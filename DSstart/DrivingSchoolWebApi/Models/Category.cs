
using System.ComponentModel.DataAnnotations;

namespace DrivingSchoolWebApi.Models
{
    public class Category : ENT
    {
        public string NAME { get; set; }
        public decimal PRICE { get; set; }
        public int NUMBER_OF_TR_LECTURES { get; set; }
        public int NUMBER_OF_DRIVING_LECTURES { get; set; }

       
    }
}
