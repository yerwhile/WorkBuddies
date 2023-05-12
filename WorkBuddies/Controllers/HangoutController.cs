using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
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
        private readonly IBuddyRepository _buddyRepository;

        public HangoutController(IHangoutRepository hangoutRepository, IBuddyRepository buddyRepository)
        {
            _hangoutRepository = hangoutRepository;
            _buddyRepository = buddyRepository;
        }


        [HttpGet]
        public IActionResult GetAll()
        {

            return Ok(_hangoutRepository.GetHangouts());
        }

        [HttpGet("searchByState")]
        public IActionResult GetHangoutsByState(string q)
        {

            return Ok(_hangoutRepository.GetHangoutsByState(q));
        }

        private Buddy GetCurrentBuddy()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _buddyRepository.GetByFirebaseUserId(firebaseUserId);
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

        [HttpGet("hangoutsByPack/{packId}")]
        public IActionResult GetHangoutsByPack(int packId)
        {
            return Ok(_hangoutRepository.GetHangoutIdsByPack(packId));
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
