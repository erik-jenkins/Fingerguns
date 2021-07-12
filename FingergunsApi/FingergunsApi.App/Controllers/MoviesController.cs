using System;
using System.Threading.Tasks;
using FingergunsApi.App.Data;
using Microsoft.AspNetCore.Mvc;

namespace FingergunsApi.App.Controllers
{
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieRepository _movieRepository;

        public MoviesController(IMovieRepository movieRepository)
        {
            _movieRepository = movieRepository;
        }

        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetMovies()
        {
            await Task.Delay(TimeSpan.FromMilliseconds(100));
            return Ok(_movieRepository.GetMovies());
        }
    }
}
