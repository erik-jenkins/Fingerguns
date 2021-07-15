using System.Collections.Generic;
using TMDbLib.Objects.Movies;

namespace FingergunsApi.Domain.Dockets
{
    public class Docket
    {
        public int Id { get; set; }
        public List<Movie> Movies { get; set; } = new();
    }
}
