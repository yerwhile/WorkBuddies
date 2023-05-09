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
    public class PackController : ControllerBase
    {
        private readonly IPackRepository _packRepository;
        private readonly IBuddyRepository _buddyRepository;
        public PackController(IPackRepository packRepository, IBuddyRepository buddyRepository)
        {
            _packRepository = packRepository;
            _buddyRepository = buddyRepository;
        }


        [HttpGet]
        public IActionResult GetAll()
        {

            return Ok(_packRepository.GetPacks());
        }

        [HttpGet("details/{id}")]
        public IActionResult GetById(int id)
        {

            var pack = _packRepository.GetPackById(id);
            if (pack == null)
            {
                return NotFound();
            }
            return Ok(pack);

        }

        [HttpGet("searchByState")]
        public IActionResult GetPacksByState()
        {
            var currentBuddy = GetCurrentBuddy();

            return Ok(_packRepository.GetPacksByState(currentBuddy.State));
        }

        private Buddy GetCurrentBuddy()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _buddyRepository.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpGet("searchByHangout")]
        public IActionResult GetPacksByHangout(string q)
        {
            return Ok(_packRepository.GetPacksByHangout(q));
        }

        [HttpGet("searchByCity")]
        public IActionResult GetPacksByCity(string q)
        {
            return Ok(_packRepository.GetPacksByCity(q));
        }

        [HttpGet("searchByCompany")]
        public IActionResult GetPacksByCompany(string q)
        {
            return Ok(_packRepository.GetPacksByCompany(q));
        }

        [HttpGet("buddyCount/{id}")]
        public IActionResult GetBuddyCount(int id)
        {
            return Ok(_packRepository.GetBuddyCountByPack(id));
        }

        [HttpGet("isMember/{packId}")]
        public IActionResult GetIsMember(int packId)
        {
            var currentBuddy = GetCurrentBuddy();

            return Ok(_packRepository.DoesBuddyBelong(currentBuddy.Id, packId));
        }

        

        [HttpPost]
        public IActionResult Post(Pack pack)
        {
            pack.CreateDate = DateTime.Now;
            pack.IsOpen = true;

            try
            {
                _packRepository.Add(pack);
                return CreatedAtAction(
                    nameof(GetById),
                    new { pack.Id },
                    pack);
            }
            catch
            {
                return BadRequest();
            }
            
        }

        [HttpGet("packVibe/{id}")]
        public IActionResult GetPackVibeById(int id)
        {

            var packVibe = _packRepository.GetPackVibeById(id);
            if (packVibe == null)
            {
                return NotFound();
            }
            return Ok(packVibe);

        }

        [HttpGet("packHangout/{id}")]
        public IActionResult GetPackHangoutById(int id)
        {

            var packHangout = _packRepository.GetPackHangoutById(id);
            if (packHangout == null)
            {
                return NotFound();
            }
            return Ok(packHangout);

        }

        [HttpPost("addVibeToPack/{packId}")]
        public IActionResult AddVibesToPack(PackVibe packVibe, int packId)
        {
            try
            {
                _packRepository.DeleteVibesOnPack(packId);
                packVibe.PackId = packId;
                _packRepository.AddPackVibes(packVibe);
                return CreatedAtAction(
                    nameof(GetPackVibeById),
                    new { packVibe.Id },
                    packVibe);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("addHangoutToPack/{packId}")]
        public IActionResult AddHangoutsToPack(PackHangout packHangout, int packId)
        {
            try
            {
                _packRepository.DeleteHangoutsOnPack(packId);
                packHangout.PackId = packId;
                _packRepository.AddPackHangouts(packHangout);
                return CreatedAtAction(
                    nameof(GetPackHangoutById),
                    new { packHangout.Id },
                    packHangout);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, Pack pack)
        {
            if (id != pack.Id)
            {
                return BadRequest();
            }

            _packRepository.Update(pack);
            return NoContent();

        }

    }
}