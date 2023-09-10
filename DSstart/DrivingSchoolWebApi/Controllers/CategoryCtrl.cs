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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var categories = _context.Category.ToList();
                if (categories == null || categories.Count == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(_context.Category.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                        ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post(Category category)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.Category.Add(category);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, category);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                   ex.Message);
            }
        }


        [HttpPut]
        [Route("{ID:int}")]
        public IActionResult Put(int ID, Category category)
        {
            // Change in base
            if (ID <= 0 || category == null)
            {
                return BadRequest();
            }

            try
            {
                var cateBa = _context.Category.Find(ID);
                if (cateBa == null)
                {
                    return BadRequest();
                }
                // inače se rade Mapper-i
                // mi ćemo za sada ručno

                cateBa.NAME=category.NAME;
                cateBa.PRICE=category.PRICE;
                cateBa.NUMBER_OF_TR_LECTURES = category.NUMBER_OF_TR_LECTURES;
                cateBa.NUMBER_OF_DRIVING_LECTURES = category.NUMBER_OF_DRIVING_LECTURES;

                _context.Category.Update(cateBa);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, cateBa);

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
        public IActionResult Delete(int category)
        {
            // Delete in base
            return StatusCode(StatusCodes.Status200OK, "{\"deleted\":true}");
        }


    }
}
