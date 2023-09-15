using DrivingSchoolWebApi.Data;
using DrivingSchoolWebApi.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DrivingSchoolWebApi.Models;



namespace DrivingSchoolWebApi.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]

    public class CourseController : ControllerBase
    {
        private readonly Context _context;
        private readonly ILogger<CourseController> _logger;
        public CourseController(Context context, ILogger<CourseController> logger)
        {
            _context = context;
            _logger= logger;
        }

        
        [HttpGet]
        public IActionResult Get()
        {
            _logger.LogInformation("Getting courses");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var courses = _context.Course
                    .Include(c => c.ID_INSTRUCTOR)
                    .Include(c =>c.ID_VEHICLE)
                    .Include(c => c.ID_CATEGORY)
                    .Include(c => c.Students)
                    .ToList();

                if (courses == null || courses.Count == 0)
                {
                    return new EmptyResult();
                }

                List<CourseDTO> back = new();

                courses.ForEach(c =>
                {
                    back.Add(new CourseDTO()
                    {
                        ID = c.ID,
                        IDInstructor=c.ID_INSTRUCTOR.ID,
                        IDCategory=c.ID_CATEGORY.ID,
                        IDVehicle=c.ID_VEHICLE.ID,
                        START_DATE = c.START_DATE,
                        Number_of_students=c.Students.Count

                    });
                });  
                     return Ok(back);
                }
            catch (Exception ex)
            {
                return StatusCode(
                    StatusCodes.Status503ServiceUnavailable,
                    ex);
            }


        }
      

    }
}
