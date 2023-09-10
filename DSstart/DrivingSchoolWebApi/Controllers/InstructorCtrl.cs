using DrivingSchoolWebApi.Data;
using DrivingSchoolWebApi.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;


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
                var instBa = _context.Instructor.Find(ID);
                if (instBa == null)
                {
                    return BadRequest();
                }
                // inače se rade Mapper-i
                // mi ćemo za sada ručno

                instBa.FIRST_NAME = instructor.FIRST_NAME;
                instBa.LAST_NAME = instructor.LAST_NAME;
                instBa.DRIVER_LICENSE_NUMBER = instructor.DRIVER_LICENSE_NUMBER;
                instBa.EMAIL = instructor.EMAIL;
                instBa.CONTACT_NUMBER = instructor.CONTACT_NUMBER;

                _context.Instructor.Update(instBa);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, instBa);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                  ex); // kada se vrati cijela instanca ex tada na klijentu imamo više podataka o grešci
                // nije dobro vraćati cijeli ex ali za dev je OK
            }

        }
    }
}



        
    

