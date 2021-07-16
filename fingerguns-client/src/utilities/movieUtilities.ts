import { Movie } from "types";
import { getAtMostN } from "utilities";

export const getDirectorsString = (movie: Movie) => {
  const directors = movie.credits.crew
    .filter((crew) => crew.department === "Directing")
    .map((crew) => crew.name);

  const limitedDirectors = getAtMostN(directors, 2);

  return limitedDirectors.join(", ");
};

export const getTopStarringString = (
  movie: Movie,
  numberTopStarring: number = 4
) => {
  const numberToTake = Math.min(numberTopStarring, movie.credits.cast.length);
  const topStarring = movie.credits.cast.slice(0, numberToTake);
  const topStarringNames = [...topStarring.map((cast) => cast.name)];

  if (topStarringNames.length > 2) {
    const lastStar = topStarringNames[numberToTake - 1];
    topStarringNames[numberToTake - 1] = `and ${lastStar}`;
  }

  return `Starring ${topStarringNames.join(", ")}`;
};
