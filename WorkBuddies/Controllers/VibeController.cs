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
    public class VibeController : Controller
    {
        private readonly IVibeRepository _vibeRepository;

        public VibeController(IVibeRepository vibeRepository)
        {
           _vibeRepository = vibeRepository;
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_vibeRepository.GetVibes());
        }


        [HttpGet("vibeDetails/{id}")]
        public IActionResult GetById(int id)
        {

            var vibe = _vibeRepository.GetById(id);
            if (vibe == null)
            {
                return NotFound();
            }
            return Ok(vibe);

        }

        [HttpGet("vibesByPack/{packId}")]
        public IActionResult GetVibesByPack(int packId)
        {
            return Ok(_vibeRepository.GetVibeIdsByPack(packId));
        }

        [HttpPost]
        public IActionResult Post(Vibe vibe)
        {

            try
            {
                _vibeRepository.Add(vibe);
                return CreatedAtAction(
                    nameof(GetById),
                    new { vibe.Id },
                    vibe);
            }
            catch
            {
                return BadRequest();
            }

        }
    }
}
