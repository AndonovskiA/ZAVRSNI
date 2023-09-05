using DrivingSchoolWebApi.Data;
using DrivingSchoolWebApi.Models;

using Microsoft.AspNetCore.Mvc;


namespace DrivingSchoolWebApi.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]

    public class InstructorCtrl : ControllerBase
    {
        private readonly Context _context;

        public InstructorCtrl(Context context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            // Show from base 

            return new JsonResult(_context.Instructor.ToList());
        }

        [HttpPost]
        public IActionResult Post(Instructor instructor)
        {
            _context.Instructor.Add(instructor);
            _context.SaveChanges();

            // Adding into base
            return Created("/api/v1/Instructor", instructor);
        }


        [HttpPut]
        [Route("{ID:int}")]
        public IActionResult Put(int ID, Instructor instructor)
        {
            // Change in base



            return StatusCode(StatusCodes.Status200OK, instructor);
        }

        [HttpDelete]
        [Route("{ID:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int instructor)
        {
            // Delete in base
            return StatusCode(StatusCodes.Status200OK, "{\"deleted\":true}");
        }
    }
}

        
    

