using System.Threading.Tasks;
using FingergunsApi.Domain.Dockets;
using FingergunsApi.Infrastructure.Dockets;
using Microsoft.AspNetCore.SignalR;

namespace FingergunsApi.App.Hubs
{
    public class DocketHub : Hub
    {
        private readonly IDocketsRepository _docketsRepository;
        private readonly IDocketRandomNumberGenerator _docketRandomNumberGenerator;

        public DocketHub(
            IDocketsRepository docketsRepository,
            IDocketRandomNumberGenerator docketRandomNumberGenerator)
        {
            _docketsRepository = docketsRepository;
            _docketRandomNumberGenerator = docketRandomNumberGenerator;
        }

        public async Task AddMovie(int docketId, int movieId)
        {
            var addedMovie = await _docketsRepository.AddMovieAsync(docketId, movieId);
            await Clients.All.SendAsync("MovieAdded", addedMovie);
        }

        public async Task RemoveMovie(int docketId, int movieId)
        {
            var removedMovie = await _docketsRepository.RemoveMovieAsync(docketId, movieId);
            await Clients.All.SendAsync("MovieRemoved", removedMovie);
        }

        public async Task SelectMovie(int docketId)
        {
            var docket = await _docketsRepository.GetDocketAsync(docketId);
            var movieCount = docket.Movies.Count;
            var initialMovieIndex = _docketRandomNumberGenerator.GetRandomMovieIndex(movieCount);
            var numberOfDelays = _docketRandomNumberGenerator.GetNumberOfDelays(movieCount);
            await Clients.All.SendAsync("MovieSelected", initialMovieIndex, numberOfDelays);
        }
    }
}
