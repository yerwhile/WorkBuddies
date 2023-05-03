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
        public PackController(IPackRepository packRepository)
        {
            _packRepository = packRepository;
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