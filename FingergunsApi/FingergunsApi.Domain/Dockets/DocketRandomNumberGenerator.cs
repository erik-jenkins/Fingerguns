using System;

namespace FingergunsApi.Domain.Dockets
{
    public interface IDocketRandomNumberGenerator
    {
        int GetRandomMovieIndex(int numberOfMovies);
        int GetNumberOfDelays(int numberOfMovies);
        void SetRandom(Random random);
    }

    public class DocketRandomNumberGenerator : IDocketRandomNumberGenerator
    {
        private Random _random = new Random();

        public int GetRandomMovieIndex(int numberOfMovies)
        {
            return _random.Next(numberOfMovies);
        }

        public int GetNumberOfDelays(int numberOfMovies)
        {
            int minimumNumberOfDelays = GetMinimumNumberOfDelays(numberOfMovies);
            int maximumNumberOfDelays = GetMaximumNumberOfDelays(numberOfMovies);
            int numberOfDelays = _random.Next(minimumNumberOfDelays, maximumNumberOfDelays);
            return numberOfDelays;
        }

        private int GetMinimumNumberOfDelays(int numberOfMovies)
        {
            return numberOfMovies * 2;
        }

        private int GetMaximumNumberOfDelays(int numberOfMovies)
        {
            return numberOfMovies * 4;
        }

        private double GetPickerDelay(int currentIteration, int numberOfDelays)
        {
            var interpolatedPosition = (double) currentIteration / numberOfDelays;
            return Math.Pow(3 * interpolatedPosition, 6) + 200;
        }

        public void SetRandom(Random random)
        {
            _random = random;
        }
    }
}
