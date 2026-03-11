using JobService.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Security.Claims;

namespace JobService.Controllers
{
    //[Route("api/[controller]")]
    [Route("api/job")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly JobDbContext _context;
        public JobController(JobDbContext context) 
        {
            _context = context;
        }

        [Authorize]
        [HttpPost]
        public IActionResult CreateJob(JobbApplication job)
        {

            Debug.WriteLine("Reading claims!");
            foreach (var claim in User.Claims)
            {
                Debug.WriteLine($"{claim.Type} : {claim.Value}");
            }
            Debug.WriteLine("Reading claims complete!");

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null) return BadRequest("User does not exist! " + User.Claims);

            job.UserId = int.Parse(userId);
            job.AppliedDate = DateTime.UtcNow;

            _context.JobApplications.Add(job);
            _context.SaveChanges();

            return Ok(job);
        }
    }
}
