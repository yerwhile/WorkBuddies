using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using WorkBuddies.Models;
using WorkBuddies.Repositories;

namespace WorkBuddies.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class HangoutController : Controller
    {
        private readonly IHangoutRepository _hangoutRepository;
        public HangoutController(IHangoutRepository hangoutRepository)
        {
            _hangoutRepository = hangoutRepository;
        }


        [HttpGet]
        public IActionResult GetAll()
        {

            return Ok(_hangoutRepository.GetHangouts());
        }

        [HttpGet("hangoutDetails/{id}")]
        public IActionResult GetById(int id)
        {

            var hangout = _hangoutRepository.GetById(id);
            if (hangout == null)
            {
                return NotFound();
            }
            return Ok(hangout);

        }

        [HttpPost]
        public IActionResult Post(Hangout hangout)
        {

            try
            {
                _hangoutRepository.Add(hangout);
                return CreatedAtAction(
                    nameof(GetById),
                    new { hangout.Id },
                    hangout);
            }
            catch
            {
                return BadRequest();
            }

        }
    }
}
