using FingergunsApi.App.Data;
using Microsoft.Extensions.DependencyInjection;

namespace FingergunsApi.App
{
    public static class ApplicationServiceRegistry
    {
        public static void RegisterApplicationServices(this IServiceCollection services)
        {
            services.AddSingleton<IMovieRepository, MovieRepository>();
            services.AddTransient<IMovieRandomNumberGenerator, MovieRandomNumberGenerator>();
        }
    }
}
