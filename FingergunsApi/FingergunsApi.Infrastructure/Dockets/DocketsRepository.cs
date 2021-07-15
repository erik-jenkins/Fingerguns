using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FingergunsApi.Domain.Dockets;
using FingergunsApi.Infrastructure.Movies.Dtos;
using FingergunsApi.Infrastructure.Tmdb;
using TMDbLib.Objects.Movies;

namespace FingergunsApi.Infrastructure.Dockets
{
    public interface IDocketsRepository
    {
        public Task<Docket> GetDocketAsync(int docketId);
        public Task<Movie> AddMovieAsync(int docketId, int movieId);
        public Task<Movie> RemoveMovieAsync(int docketId, int movieId);
    }

    public class DocketsRepository : IDocketsRepository
    {
        private List<MovieDto> _docket = new()
        {
            new MovieDto {Id = 36992},
            new MovieDto {Id = 15239},
            new MovieDto {Id = 649006}
        };

        private readonly ITmdbRepository _tmdbRepository;

        public DocketsRepository(ITmdbRepository tmdbRepository)
        {
            _tmdbRepository = tmdbRepository;
        }

        public async Task<Docket> GetDocketAsync(int docketId)
        {
            var movieIds = _docket.Select(movie => movie.Id);
            var movies = await _tmdbRepository.GetMoviesAsync(movieIds);

            return new Docket {Id = docketId, Movies = movies};
        }

        public async Task<Movie> AddMovieAsync(int docketId, int movieId)
        {
            var movie = await _tmdbRepository.GetMovieAsync(movieId);
            _docket.Add(new MovieDto() {Id = movie.Id});
            return movie;
        }

        public async Task<Movie> RemoveMovieAsync(int docketId, int movieId)
        {
            _docket = _docket.Where(d => d.Id != movieId).ToList();
            var movie = await _tmdbRepository.GetMovieAsync(movieId);
            return movie;
        }
    }
}
