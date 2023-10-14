using System.ComponentModel.DataAnnotations;

namespace DrivingSchoolWebApi.NameCanNutBeNumber
{
    public class NameCanNutBeNumber: ValidationAttribute
    {
         protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
         {
         try
         {
             var number = decimal.Parse((string)value);
             return new ValidationResult("Name or tittle can not be a number. Please put name or tittle in letters/words.");
          }
         catch (Exception e)
         {

         }
          return ValidationResult.Success;
         }

        
    }
}
