using DrivingSchoolWebApi.Data;
using DrivingSchoolWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DrivingSchoolWebApi.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class StudentCtrl : ControllerBase
    {
        private readonly Context _context;

        public StudentCtrl(Context context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get() 
        {
            return new JsonResult(_context.Student.ToList());
        }

        [HttpPost]
        public IActionResult Post(Student student)
        {
            
            _context.Student.Add(student);
            _context.SaveChanges();
            // Adding into base
            return Created("/api/v1/Student", student); 
        }


        [HttpPut]
        [Route("{ID:int}")]
        public IActionResult Put(int ID, Student student)
        {
            // Change in base



            return StatusCode(StatusCodes.Status200OK, student);
        }

        [HttpDelete]
        [Route("{ID:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int student)
        {
            // Delete in base
            return StatusCode(StatusCodes.Status200OK, "{\"deleted\":true}");
        }
    }
}







