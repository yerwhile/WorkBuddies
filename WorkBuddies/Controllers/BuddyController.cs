﻿using Microsoft.AspNetCore.Authorization;
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
        public IActionResult GetBuddiesByState()
        {
            var currentBuddy = GetCurrentBuddy();


            return Ok(_buddyRepository.GetBuddiesByState(currentBuddy.State));
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

        [HttpPost]
        public IActionResult Post(Buddy buddy)
        {
            _buddyRepository.Add(buddy);
            return CreatedAtAction(
                nameof(GetBuddyByFire),
                new { firebaseUserId = buddy.FirebaseUserId },
                buddy);
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, Buddy buddy)
        {
            if (id != buddy.Id)
            {
                return BadRequest();
            }

            _buddyRepository.Update(buddy);
            return NoContent();

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