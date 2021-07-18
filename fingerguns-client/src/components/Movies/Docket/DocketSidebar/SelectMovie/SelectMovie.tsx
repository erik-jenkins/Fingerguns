import React, { useContext, useEffect, useState } from "react";
import confetti from "canvas-confetti";

import Button from "react-bootstrap/Button";

import { DocketContext } from "hooks/useDocket";
import { setTimeout } from "timers";
import { PosterSize } from "types";
import Poster from "components/Movies/Poster";
import LoadingIcon, { LoadingIconSize } from "components/LoadingIcon";

const SelectMovie = () => {
  const { docket, selectMovie, selected } = useContext(DocketContext);
  const [movieIndex, setMovieIndex] = useState<number>(0);
  const [isSelectingMovie, setIsSelectingMovie] = useState(false);

  // forgive me father, for I have sinned
  useEffect(() => {
    if (selected == null) return;
    if (docket == null) return;

    setIsSelectingMovie(true);
    setMovieIndex((m) => selected.initialMovieIndex);
    const promises: Promise<void>[] = [];

    for (let i = 0; i < selected.numberOfDelays; i++) {
      const promise = new Promise<void>((resolve) =>
        setTimeout(() => {
          setMovieIndex((m) => (m + 1) % docket.movies.length);
          resolve();
        }, i * getSleepForDelay(i, selected.numberOfDelays))
      );
      promises.push(promise);
    }

    Promise.all(promises).then(() => {
      setIsSelectingMovie(false);
      fireConfetti();
    });
  }, [selected, docket]);

  function fireConfetti() {
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    var interval: any = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount: 300,
          origin: { x: randomInRange(0.2, 0.8), y: Math.random() - 0.2 },
        })
      );
    }, 750);
  }

  function getSleepForDelay(delayIndex: number, numberOfDelays: number) {
    const interpolatedPosition = delayIndex / numberOfDelays;
    const delay = Math.pow(5 * interpolatedPosition - 0.4, 4) + 200;
    console.log(delayIndex, numberOfDelays, interpolatedPosition, delay);
    return delay;
  }

  const handleSelectMovieButtonClick = () => {
    if (!isSelectingMovie) selectMovie();
  };

  return (
    <div className="select-movie">
      <div className="d-grid gap-2 mb-2">
        <Button variant="primary" onClick={handleSelectMovieButtonClick}>
          {isSelectingMovie ? (
            <>
              <LoadingIcon size={LoadingIconSize.Small} />
              <span className="ms-2">Selecting movie</span>
            </>
          ) : (
            <span>Select movie</span>
          )}
        </Button>
      </div>
      {docket?.movies.length && (
        <Poster
          posterPath={docket.movies[movieIndex].posterPath ?? "test"}
          movieTitle={docket.movies[movieIndex].title}
          size={PosterSize.w500}
        />
      )}
    </div>
  );
};

export default SelectMovie;
