import React from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Movie, PosterSize } from "types";
import {
  getDirectorsString,
  getTopStarringString,
} from "utilities/movieUtilities";

interface MovieCardProps {
  movie: Movie;
}

const basePosterPath = "https://image.tmdb.org/t/p";

function MovieCard({ movie }: MovieCardProps) {
  const posterPath = `${basePosterPath}/${PosterSize.w500}${movie.posterPath}`;
  const directorsString = getDirectorsString(movie);
  const topStarringString = getTopStarringString(movie);
  var releaseDate = new Date(movie.releaseDate);

  return (
    <Card style={{ height: "100%" }}>
      <Card.Img
        variant="top"
        src={posterPath}
        style={{
          height: "300px",
          objectFit: "cover",
          objectPosition: "0px 0px",
        }}
      />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.tagline}</Card.Text>
        <small className="text-muted">
          {directorsString}, {releaseDate.getFullYear()}. {topStarringString}.
        </small>
      </Card.Body>
      <Card.Footer className="">
        <Button variant="primary" size="sm" className="me-1">
          Details
        </Button>
        <Button variant="danger" size="sm" className="me-1">
          Remove
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default MovieCard;
