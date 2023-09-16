using DrivingSchoolWebApi.Data;
using DrivingSchoolWebApi.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DrivingSchoolWebApi.Models;
using System.Linq.Expressions;

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
            }
            if (courseDTO.IDCategory  <= 0) 
            {
                return BadRequest(ModelState);
            }
            try 
            {
                var instructor = _context.Instructor.Find(courseDTO.IDInstructor);
                if (instructor == null) 
                {
                    return BadRequest(ModelState);
                }
                var vehicle = _context.Vehicle.Find(courseDTO.IDVehicle);
                if(vehicle == null)
                {
                    return BadRequest(ModelState);
                }

                var category = _context.Category.Find(courseDTO.IDCategory);
                if (category == null)
                {
                    return BadRequest(ModelState);
                }


                Course c = new()
                {
                    START_DATE = courseDTO.START_DATE,
                    Instructor= instructor,
                    Vehicle= vehicle,
                    Category= category
                    
                };

                _context.Course.Add(c);
                _context.SaveChanges();

                courseDTO.ID = c.ID;
              

                return Ok(courseDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,ex);
            }

        }

        [HttpPut]
        [Route("{ID:int}")]

        public IActionResult Put(int ID, CourseDTO courseDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            if (ID <= 0 || courseDTO == null)
            {
                return BadRequest();
            }
            try
            {
                var course = _context.Course.Find(ID);
                if (course == null)
                {
                    return BadRequest();
                }
                var instructor = _context.Instructor.Find(courseDTO.);
                if (instructor == null)
                {
                    return BadRequest(ModelState);
                }
                var vehicle = _context.Vehicle.Find(ID);
                if (vehicle == null)
                {
                    return BadRequest(ModelState);
                }

                var category = _context.Category.Find(ID);
                if (category == null)
                {
                    return BadRequest(ModelState);
                }

              /*  var student = _context.Student.Find(ID);
                if (student == null)
                {
                    return BadRequest(ModelState);
                }
              */
                course.START_DATE = START_DATE;

                course.Instructor= instructor;
                course.Vehicle = vehicle;
                course.Category = category;



                _context.Course.Add(course);
                _context.SaveChanges();

                // public int Number_of_students { get; set; }
                /*START_DATE,
                    Instructor = instructor,
                    Vehicle = vehicle,
                    Category = category
                     courseDTO.ID = ID;
                */



                return Ok(courseDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(
                    StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }

        }












    }   

}
    

