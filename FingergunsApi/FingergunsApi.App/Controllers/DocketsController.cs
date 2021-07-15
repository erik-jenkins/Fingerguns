using System.Threading.Tasks;
using FingergunsApi.Infrastructure.Dockets;
using Microsoft.AspNetCore.Mvc;

namespace FingergunsApi.App.Controllers
{
    [Route("api/[controller]")]
    public class DocketsController : ControllerBase
    {
        private readonly IDocketsRepository _docketsRepository;

        public DocketsController(IDocketsRepository docketsRepository)
        {
            _docketsRepository = docketsRepository;
        }

        [HttpGet]
        [Route("{docketId}")]
        public async Task<IActionResult> GetDocket(int docketId)
        {
            var docket = await _docketsRepository.GetDocketAsync(docketId);
            return Ok(docket);
        }
    }
}
