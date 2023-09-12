using DrivingSchoolWebApi.Data;
using DrivingSchoolWebApi.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;


namespace DrivingSchoolWebApi.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]

    public class InstructorController : ControllerBase
    {
        private readonly Context _context;

        public InstructorController(Context context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var instructors = _context.Instructor.ToList();
                if (instructors == null || instructors.Count == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(_context.Instructor.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                        ex.Message);
            }

        }

        [HttpPost]
        public IActionResult Post(Instructor instructor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.Instructor.Add(instructor);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, instructor);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                   ex.Message);
            }



        }


        [HttpPut]
        [Route("{ID:int}")]

        public IActionResult Put(int ID, Instructor instructor)
        {

            if (ID <= 0 || instructor == null)
            {
                return BadRequest();
            }

            try
            {
                var instructorBase = _context.Instructor.Find(ID);
                if (instructorBase == null)
                {
                    return BadRequest();
                }
                // inače se rade Mapper-i
                // mi ćemo za sada ručno

                instructorBase.FIRST_NAME = instructor.FIRST_NAME;
                instructorBase.LAST_NAME = instructor.LAST_NAME;
                instructorBase.DRIVER_LICENSE_NUMBER = instructor.DRIVER_LICENSE_NUMBER;
                instructorBase.EMAIL = instructor.EMAIL;
                instructorBase.CONTACT_NUMBER = instructor.CONTACT_NUMBER;

                _context.Instructor.Update(instructorBase);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, instructorBase);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                  ex); // kada se vrati cijela instanca ex tada na klijentu imamo više podataka o grešci
                // nije dobro vraćati cijeli ex ali za dev je OK
            }

        }

        [HttpDelete]
        [Route("{ID:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int ID)
        {
            if (ID <= 0)
            {
                return BadRequest();
            }

            var instructorBase = _context.Instructor.Find(ID);
            if (instructorBase == null)
            {
                return BadRequest();
            }

            try
            {
                _context.Instructor.Remove(instructorBase);
                _context.SaveChanges();

                return new JsonResult("{\"poruka\":\"Deleted\"}");

            }
            catch (Exception ex)
            {

                return new JsonResult("{\"poruka\":\"Can not be deleted\"}");

            }
        }


    }
}



        
    

