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
    public class BuddyController : ControllerBase
    {
        private readonly IBuddyRepository _buddyRepository;
        public BuddyController(IBuddyRepository buddyRepository)
        {
            _buddyRepository = buddyRepository;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetBuddyByFire(string firebaseUserId)
        {
            return Ok(_buddyRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("DoesBuddyExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var buddy = _buddyRepository.GetByFirebaseUserId(firebaseUserId);

            if (buddy == null)
            {
                return NotFound();
            }

            return Ok(buddy);
        }

        [HttpGet]
        public IActionResult GetAllBuddies()
        {

            return Ok(_buddyRepository.GetBuddies());
        }

        [HttpGet("searchByState")]
        public IActionResult GetBuddiesByState(string q)
        {

            return Ok(_buddyRepository.GetBuddiesByState(q));
        }

        [HttpGet("profile/{id}")]
        public IActionResult GetBuddyById(int id)
        {

            var buddy = _buddyRepository.GetById(id);
            if (buddy == null)
            {
                return NotFound();
            }
            return Ok(buddy);

        }

        [HttpGet("getBuddyPacks/{id}")]
        public IActionResult GetBuddyPackById(int id)
        {
            var buddyPack = _buddyRepository.GetBuddyPackById(id);
            if (buddyPack == null)
            {
                return NotFound();
            }
            return Ok(buddyPack);
        }

        [HttpGet("getBuddyPackByPack/{packId}")]
        public IActionResult GetBuddyPackByPack(int packId)
        {
            var currentBuddy = GetCurrentBuddy();
            var buddyPack = _buddyRepository.FindBuddyPackByPack(currentBuddy.Id, packId);
            if(buddyPack == null)
            {
                return NotFound();
            }
            return Ok(buddyPack);
        }

        [HttpPost]
        public IActionResult Post(Buddy buddy)
        {
            _buddyRepository.Add(buddy);
            return CreatedAtAction(
                nameof(GetBuddyByFire),
                new { firebaseUserId = buddy.FirebaseUserId },
                buddy);
        }

        [HttpPost("addBuddyPack")]
        public IActionResult PostBuddyPack(BuddyPack buddyPack)
        {
            _buddyRepository.AddBuddyPack(buddyPack);
            return CreatedAtAction(
                nameof(GetBuddyPackById),
                new { buddyPack.Id },
                buddyPack);
        }

        [HttpPut("editProfile/{id}")]
        public IActionResult Edit(int id, Buddy buddy)
        {
            if (id != buddy.Id)
            {
                return BadRequest();
            }

            _buddyRepository.Update(buddy);
            return NoContent();

        }

        [HttpDelete("deleteBuddyPack/{buddyPackId}")]
        public IActionResult DeleteBuddyPack(int buddyPackId)
        { 
            try
            {
                _buddyRepository.DeleteBuddyPack(buddyPackId);
                return NoContent();
            }
            catch
            {
                return BadRequest();
            }
        }

        private Buddy GetCurrentBuddy()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _buddyRepository.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpGet("Me")]
        public IActionResult Me()
        {
            var user = GetCurrentBuddy();
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }


       
    }
}