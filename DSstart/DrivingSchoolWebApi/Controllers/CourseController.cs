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

        public DateTime? START_DATE { get; private set; }

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
                    .Include(c => c.Instructor)
                    .Include(c =>c.Vehicle)
                    .Include(c => c.Category)
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
                        IDInstructor=c.Instructor.ID,
                        IDCategory=c.Category.ID,
                        IDVehicle=c.Vehicle.ID,
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

        [HttpPost]

        public IActionResult Post(CourseDTO courseDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (courseDTO.IDInstructor <= 0)
            {
                return BadRequest(ModelState);
            }

            if (courseDTO.IDVehicle <= 0)
            {
                return BadRequest(ModelState);


            if (courseDTO.IDCategory <= 0)
                {
                    return BadRequest(ModelState);
                }
            }
            try 
            {
                Course c = new();
                {
                    START_DATE = courseDTO.START_DATE;
                    
                };


                return Ok(courseDTO);
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
