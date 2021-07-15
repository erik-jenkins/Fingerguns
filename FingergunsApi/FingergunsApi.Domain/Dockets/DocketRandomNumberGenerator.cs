using System;

namespace FingergunsApi.Domain.Dockets
{
    public interface IDocketRandomNumberGenerator
    {
        int GetRandomMovieIndex(int numberOfMovies);
        double[] GetSelectionDelays(int numberOfMovies);
        void SetRandom(Random random);
    }

    public class DocketRandomNumberGenerator : IDocketRandomNumberGenerator
    {
        private Random _random = new Random();

        public int GetRandomMovieIndex(int numberOfMovies)
        {
            return _random.Next(numberOfMovies);
        }

        public double[] GetSelectionDelays(int numberOfMovies)
        {
            int minimumNumberOfDelays = GetMinimumNumberOfDelays(numberOfMovies);
            int maximumNumberOfDelays = GetMaximumNumberOfDelays(numberOfMovies);
            int numberOfDelays = _random.Next(minimumNumberOfDelays, maximumNumberOfDelays);

            var delays = new double[numberOfDelays];
            for (var i = 0; i < numberOfDelays; i++)
            {
                delays[i] = GetPickerDelay(i, numberOfDelays);
            }

            return delays;
        }

        private int GetMinimumNumberOfDelays(int numberOfMovies)
        {
            return numberOfMovies * numberOfMovies * 2;
        }

        private int GetMaximumNumberOfDelays(int numberOfMovies)
        {
            return numberOfMovies * numberOfMovies * 3;
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
