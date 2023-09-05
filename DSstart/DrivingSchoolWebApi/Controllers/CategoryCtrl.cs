using DrivingSchoolWebApi.Data;
using DrivingSchoolWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DrivingSchoolWebApi.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]

    public class CategoryCtrl : ControllerBase
    {
        private readonly Context _context;

        public CategoryCtrl(Context context) 
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_context.Student.ToList());
        }

        [HttpPost]
        public IActionResult Post(Category category)
        {

            _context.Category.Add(category);
            _context.SaveChanges();
            // Adding into base
            return Created("/api/v1/Category", category);
        }


        [HttpPut]
        [Route("{ID:int}")]
        public IActionResult Put(int ID, Category category)
        {
            // Change in base



            return StatusCode(StatusCodes.Status200OK, category);
        }

        [HttpDelete]
        [Route("{ID:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int category)
        {
            // Delete in base
            return StatusCode(StatusCodes.Status200OK, "{\"deleted\":true}");
        }


    }
}
