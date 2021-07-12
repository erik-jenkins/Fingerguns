using System.Threading.Tasks;
using FingergunsApi.App.Data;
using Microsoft.AspNetCore.SignalR;

namespace FingergunsApi.App
{
    public class MoviesHub : Hub
    {
        private readonly IMovieRepository _movieRepository;
        private readonly IMovieRandomNumberGenerator _movieRandomNumberGenerator;

        public MoviesHub(
            IMovieRepository movieRepository,
            IMovieRandomNumberGenerator movieRandomNumberGenerator)
        {
            _movieRepository = movieRepository;
            _movieRandomNumberGenerator = movieRandomNumberGenerator;
        }

        public async Task AddMovie(string movieTitle)
        {
            var newMovie = _movieRepository.AddMovie(movieTitle);
            await Clients.All.SendAsync("MovieAdded", newMovie);
        }

        public async Task RemoveMovie(int movieId)
        {
            var removedMovie = _movieRepository.RemoveMovie(movieId);
            await Clients.All.SendAsync("MovieRemoved", removedMovie);
        }

        public async Task SelectMovie(int numberOfMovies)
        {
            var initialMovieIndex = _movieRandomNumberGenerator.GetRandomMovieIndex(numberOfMovies);
            var selectionDelays = _movieRandomNumberGenerator.GetSelectionDelays(numberOfMovies);
            await Clients.All.SendAsync("MovieSelected", initialMovieIndex, selectionDelays);
        }
    }
}
