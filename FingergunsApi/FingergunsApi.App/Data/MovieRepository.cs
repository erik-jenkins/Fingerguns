using System.Collections.Generic;
using System.Linq;

namespace FingergunsApi.App.Data
{
    public interface IMovieRepository
    {
        List<Movie> GetMovies();
        Movie AddMovie(string movieTitle);
        Movie RemoveMovie(int movieId);
    }

    public class MovieRepository : IMovieRepository
    {
        private readonly List<Movie> _movies = new()
        {
            new(1, "Shakma"),
            new(2, "The Toxic Avenger"),
            new(3, "A Karate Christmas Miracle"),
        };

        public List<Movie> GetMovies()
        {
            return _movies;
        }

        public Movie AddMovie(string movieTitle)
        {
            var newMovie = new Movie(GetNextMovieId(), movieTitle);
            _movies.Add(newMovie);
            return newMovie;
        }

        private int GetNextMovieId()
        {
            if (_movies.Count == 0)
                return 1;

            return _movies.Select(m => m.Id).Max() + 1;
        }

        public Movie RemoveMovie(int movieId)
        {
            var movieToRemove = _movies.Single(movie => movie.Id == movieId);
            _movies.Remove(movieToRemove);
            return movieToRemove;
        }
    }

    public record Movie(
        int Id,
        string Title);
}
