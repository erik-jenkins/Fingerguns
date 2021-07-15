using System.IO;
using FingergunsApi.Infrastructure.Config;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace FingergunsApi.App
{
    public class Program
    {
        public static void Main(string[] args)
        {
            LoadEnvironmentVariables();
            CreateHostBuilder(args).Build().Run();
        }

        private static void LoadEnvironmentVariables()
        {
            var root = Directory.GetCurrentDirectory();
            var envFilepath = Path.Join(root, ".env");
            EnvFileLoader.Load(envFilepath);
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}
