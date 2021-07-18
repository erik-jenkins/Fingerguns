import React from 'react';

import Card from 'react-bootstrap/Card';

import { Movie, PosterSize } from 'types';
import { getFullPosterPath } from 'utilities/movieUtilities';

interface SmallMovieCardProps {
  movie: Movie;
}

function SmallMovieCard({movie}: SmallMovieCardProps) {
  const posterPath = getFullPosterPath(movie, PosterSize.w185);

  return (
    <Card className="d-flex flex-direction-row">
      <Card.Img
        variant="top"
        src={posterPath}
      />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default SmallMovieCard;