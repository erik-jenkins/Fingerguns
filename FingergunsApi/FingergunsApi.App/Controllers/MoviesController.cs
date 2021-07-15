using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using TMDbLib.Client;

namespace FingergunsApi.App.Controllers
{
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly TMDbClient _tmDbClient;

        public MoviesController(TMDbClient tmDbClient)
        {
            _tmDbClient = tmDbClient;
        }

        [HttpGet]
        [Route("search")]
        public async Task<IActionResult> SearchMovies(string query, int? page = null)
        {
            var decodedQuery = HttpUtility.UrlDecode(query);
            var searchResponse = (await _tmDbClient.SearchMovieAsync(decodedQuery)).Results;
            return Ok(searchResponse);
        }
    }
}
