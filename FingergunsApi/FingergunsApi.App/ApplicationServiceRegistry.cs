using System;
using FingergunsApi.Domain.Dockets;
using FingergunsApi.Infrastructure.Dockets;
using FingergunsApi.Infrastructure.Tmdb;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TMDbLib.Client;

namespace FingergunsApi.App
{
    public static class ApplicationServiceRegistry
    {
        public static void RegisterApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddHttpClient("tmdb", c => { c.BaseAddress = new Uri("https://api.themoviedb.org/3/"); });

            var tmdbApiKey = Environment.GetEnvironmentVariable("TMDB_API_KEY");
            if (string.IsNullOrEmpty(tmdbApiKey))
                throw new Exception("TMDB API key must be set!");

            services.AddTransient((_) => new TMDbClient(tmdbApiKey));
            services.AddTransient<ITmdbRepository, TmdbRepository>();
            services.AddSingleton<IDocketsRepository, DocketsRepository>();
            services.AddTransient<IDocketRandomNumberGenerator, DocketRandomNumberGenerator>();
        }
    }
}
