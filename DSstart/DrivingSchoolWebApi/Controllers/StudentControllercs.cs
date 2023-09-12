﻿using DrivingSchoolWebApi.Data;
using DrivingSchoolWebApi.Models;
using DrivingSchoolWebApi.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Net;


namespace DrivingSchoolWebApi.Controllers
{
   
    
        [ApiController]
        [Route("api/v1/[controller]")]

        public class StudentController : ControllerBase
        {
            private readonly Context _context;
            public StudentController(Context context) 
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

                var students = _context.Student.ToList();
                if (students == null || students.Count == 0)
                {
                    return new EmptyResult();
                }

                List<StudentDTO> back = new();

                students.ForEach(s =>
                {
                    var sDto = new StudentDTO()
                    {
                        ID= s.ID,
                        FIRST_NAME= s.FIRST_NAME,
                        LAST_NAME= s.LAST_NAME,
                        ADDRESS= s.ADDRESS,
                        CONTACT_NUMBER=s.CONTACT_NUMBER,
                        DATE_OF_ENROLLMENT=s.DATE_OF_ENROLLMENT,

                    };
                       back.Add(sDto);

                });

                return Ok(back);

            }


            [HttpPost]
            public IActionResult Post(StudentDTO dto)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                try
                {
                    Student s = new Student()
                    {
                        FIRST_NAME = dto.FIRST_NAME,
                        LAST_NAME = dto.LAST_NAME,
                        ADDRESS = dto.ADDRESS,
                        CONTACT_NUMBER = dto.CONTACT_NUMBER,
                        DATE_OF_ENROLLMENT = dto.DATE_OF_ENROLLMENT,
                    };

                    _context.Student.Add(s);
                    _context.SaveChanges();
                    dto.ID = s.ID;
                    return Ok(dto);

                }
                catch (Exception ex)
                {
                    return StatusCode(
                        StatusCodes.Status503ServiceUnavailable, ex.Message);
                }
            }

            [HttpPut]
            [Route("{ID:int}")]
            public IActionResult Put(int ID,StudentDTO sDto)
            {

                if (ID <= 0 || sDto == null)
                {
                    return BadRequest();
                }

                try
                {
                    var studentBase = _context.Student.Find(ID);
                    if (studentBase == null)
                    {
                        return BadRequest();
                    }
                    
                    studentBase.FIRST_NAME = sDto.FIRST_NAME;
                    studentBase.LAST_NAME = sDto.LAST_NAME;
                    studentBase.ADDRESS = sDto.ADDRESS;
                    studentBase.CONTACT_NUMBER = sDto.CONTACT_NUMBER;
                    studentBase.DATE_OF_ENROLLMENT = sDto.DATE_OF_ENROLLMENT;

                    _context.Student.Update(studentBase);
                    sDto.ID = studentBase.ID;
                    return StatusCode(StatusCodes.Status200OK, sDto);

                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                      ex); 
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

                var studentBase = _context.Student.Find(ID);
                if (studentBase == null)
                {
                    return BadRequest();
                }

                try
                {
                    _context.Student.Remove(studentBase);
                    _context.SaveChanges();

                    return new JsonResult("{\"message\":\"Deleted\"}");

                }
                catch (Exception ex)
                {

                    return new JsonResult("{\"message\":\"Can not be deleted\"}");

                }

            }

        }


    }
