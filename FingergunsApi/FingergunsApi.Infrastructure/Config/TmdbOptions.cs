namespace FingergunsApi.Infrastructure.Config
{
    public class TmdbOptions
    {
        public const string EnvironmentVariable = "TMDB_API_KEY";
        public string ApiKey { get; set; }
    }
}
