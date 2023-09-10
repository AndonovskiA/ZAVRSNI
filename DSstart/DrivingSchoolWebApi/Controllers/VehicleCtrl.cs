using DrivingSchoolWebApi.Data;
using DrivingSchoolWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;

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
                var vehVe = _context.Vehicle.Find(ID);
                if (vehVe == null)
                {
                    return BadRequest();
                }
                // inače se rade Mapper-i
                // mi ćemo za sada ručno

                vehVe.TYPE = vehicle.TYPE;
                vehVe.BRAND = vehicle.BRAND;
                vehVe.MODEL = vehicle.MODEL;
                vehVe.PURCHASE_DATE=vehicle.PURCHASE_DATE;
                vehVe.DATE_OF_REGISTRATION=vehicle.DATE_OF_REGISTRATION;
                

                _context.Vehicle.Update(vehVe);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, vehVe);

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
        public IActionResult Delete(int vehicle)
        {
            // Delete in base
            return StatusCode(StatusCodes.Status200OK, "{\"deleted\":true}");
        }



    }
}

        
    







