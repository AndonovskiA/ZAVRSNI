using DrivingSchoolWebApi.Data;
using DrivingSchoolWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DrivingSchoolWebApi.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]

    public class VehicleCtrl : Controller
    {
        private readonly Context _context;

        public VehicleCtrl(Context context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_context.Vehicle.ToList());
        }

        [HttpPost]
        public IActionResult Post(Vehicle vehicle)
        {

            _context.Vehicle.Add(vehicle);
            _context.SaveChanges();
            // Adding into base
            return Created("/api/v1/Vehicle", vehicle);
        }


        [HttpPut]
        [Route("{ID:int}")]
        public IActionResult Put(int ID, Vehicle vehicle)
        {
            // Change in base



            return StatusCode(StatusCodes.Status200OK, vehicle);
        }

        [HttpDelete]
        [Route("{ID:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int vehicle)
        {
            // Delete in base
            return StatusCode(StatusCodes.Status200OK, "{\"deleted\":true}");
        }



    }
}

        
    







