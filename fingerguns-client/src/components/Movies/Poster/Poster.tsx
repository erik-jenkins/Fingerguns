import React from "react";
import { PosterSize } from "types";

interface PosterProps {
  posterPath: string;
  movieTitle: string;
  size: PosterSize;
  className: string;
}

const basePosterPath = "https://image.tmdb.org/t/p";

function Poster({ posterPath, movieTitle, size, className }: PosterProps) {
  const path = `${basePosterPath}/${size}${posterPath}`;
  const altText = `Poster for "${movieTitle}"`;

  return (
    <img
      src={path}
      alt={altText}
      className={`${className}`}
      style={{ width: "100%", height: '420px' }}
    />
  );
}

Poster.defaultProps = {
  className: "",
};

export default Poster;
