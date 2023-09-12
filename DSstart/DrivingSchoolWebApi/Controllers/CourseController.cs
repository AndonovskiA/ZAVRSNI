using DrivingSchoolWebApi.Data;
using Microsoft.AspNetCore.Mvc;

namespace DrivingSchoolWebApi.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]

    public class CourseController : ControllerBase
    {
        private readonly Context _context;
        public CourseController(Context context)
        {
            _context = context;
        }





    }
}
