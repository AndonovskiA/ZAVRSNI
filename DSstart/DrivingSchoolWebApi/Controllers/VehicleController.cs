using DrivingSchoolWebApi.Data;
using DrivingSchoolWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;

namespace DrivingSchoolWebApi.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]

    public class VehicleController : Controller
    {
        private readonly Context _context;

        public VehicleController(Context context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {

            {

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                try
                {
                    var vehicles = _context.Vehicle.ToList();
                    if (vehicles == null || vehicles.Count == 0)
                    {
                        return new EmptyResult();
                    }
                    return new JsonResult(_context.Vehicle.ToList());
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                            ex.Message);
                }

            }
        }






        [HttpPost]
        public IActionResult Post(Vehicle vehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.Vehicle.Add(vehicle);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, vehicle);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                   ex.Message);
            }


        }


        [HttpPut]
        [Route("{ID:int}")]
        public IActionResult Put(int ID, Vehicle vehicle)
        {
            if (ID <= 0 || vehicle == null)
            {
                return BadRequest();
            }

            try
            {
                var vehicleBase = _context.Vehicle.Find(ID);
                if (vehicleBase == null)
                {
                    return BadRequest();
                }
                // inače se rade Mapper-i
                // mi ćemo za sada ručno

                vehicleBase.TYPE = vehicle.TYPE;
                vehicleBase.BRAND = vehicle.BRAND;
                vehicleBase.MODEL = vehicle.MODEL;
                vehicleBase.PURCHASE_DATE=vehicle.PURCHASE_DATE;
                vehicleBase.DATE_OF_REGISTRATION=vehicle.DATE_OF_REGISTRATION;
                

                _context.Vehicle.Update(vehicleBase);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, vehicleBase);

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

            var vehicleBase = _context.Vehicle.Find(ID);
            if (vehicleBase == null)
            {
                return BadRequest();
            }

            try
            {
                _context.Vehicle.Remove(vehicleBase);
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

        
    







