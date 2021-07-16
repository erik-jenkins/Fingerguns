using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using TMDbLib.Client;
using TMDbLib.Objects.Movies;

namespace FingergunsApi.Infrastructure.Tmdb
{
    /// <summary>
    /// Used to abstract the details of fetching a movie from TMDB. As an example, will allow movies to
    /// be cached instead of accessed from TMDB every time.
    /// </summary>
    public interface ITmdbRepository
    {
        Task<Movie> GetMovieAsync(int id);
        Task<List<Movie>> GetMoviesAsync(IEnumerable<int> id);
    }

    public class TmdbRepository : ITmdbRepository
    {
        private readonly TMDbClient _tmDbClient;
        private readonly IMemoryCache _memoryCache;
        private readonly MemoryCacheEntryOptions _memoryCacheEntryOptions = new() {SlidingExpiration = TimeSpan.FromMinutes(5)};

        public TmdbRepository(
            TMDbClient tmDbClient,
            IMemoryCache memoryCache)
        {
            _tmDbClient = tmDbClient;
            _memoryCache = memoryCache;
        }

        public async Task<Movie> GetMovieAsync(int id)
        {
            var cacheKey = CacheKeyHelper.GetMovieCacheKey(id);
            if (_memoryCache.TryGetValue(cacheKey, out Movie movie))
                return movie;

            movie = await _tmDbClient.GetMovieAsync(id, MovieMethods.Credits);
            _memoryCache.Set(cacheKey, movie, _memoryCacheEntryOptions);

            return movie;
        }

        public async Task<List<Movie>> GetMoviesAsync(IEnumerable<int> ids)
        {
            var tasks = ids.Select(GetMovieAsync);
            var movies = await Task.WhenAll(tasks);
            return movies.ToList();
        }

        private static class CacheKeyHelper
        {
            public static string GetMovieCacheKey(int movieId) => $"{nameof(GetMovieCacheKey)}: ${movieId}";
        }
    }
}
