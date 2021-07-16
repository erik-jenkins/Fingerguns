import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import { Docket, Movie } from "types";

export enum DocketEvent {
  AddMovie = "AddMovie",
  MovieAdded = "MovieAdded",
  RemoveMovie = "RemoveMovie",
  MovieRemoved = "MovieRemoved",
  SelectMovie = "SelectMovie",
  MovieSelected = "MovieSelected",
}

function useDocket(docketId: number) {
  const [docket, setDocket] = useState<Docket | null>(null);
  const [isDocketLoading, setIsDocketLoading] = useState(false);

  const docketsHubConnection = new HubConnectionBuilder()
    .withUrl("http://localhost:5000/docketshub")
    .build();

  const startHubConnection = useCallback(() => {
    if (docketsHubConnection.state === HubConnectionState.Disconnected)
      docketsHubConnection.start();
    // eslint-disable-next-line
  }, [docketsHubConnection.state]);

  useEffect(() => {
    startHubConnection();
  }, [startHubConnection]);

  const loadDocket = useCallback(() => {
    setIsDocketLoading(true);
    axios
      .get<Docket>(`http://localhost:5000/api/dockets/${docketId}`)
      .then((response) => response.data)
      .then((docket) => {
        setIsDocketLoading(false);
        setDocket(docket)
      });
  }, [docketId]);

  useEffect(() => {
    loadDocket();
  }, [loadDocket]);

  docketsHubConnection.on(DocketEvent.MovieAdded, function (addedMovie: Movie) {
    if (docket == null) return;
    setDocket({ ...docket, movies: [...docket.movies, addedMovie] });
  });

  docketsHubConnection.on(
    DocketEvent.MovieRemoved,
    function (removedMovie: Movie) {
      if (docket == null) return;
      const filteredMovies = docket.movies.filter(
        (movie) => movie.id !== removedMovie.id
      );
      setDocket({ ...docket, movies: filteredMovies });
    }
  );

  function addMovie(movieId: number) {
    return docketsHubConnection.send(DocketEvent.AddMovie, docketId, movieId);
  }

  function removeMovie(movieId: number) {
    return docketsHubConnection.send(
      DocketEvent.RemoveMovie,
      docketId,
      movieId
    );
  }

  function selectMovie() {
    return docketsHubConnection.send(DocketEvent.SelectMovie, docketId);
  }

  function registerEventHandler(
    docketEvent: DocketEvent,
    handler: (...args: any[]) => void
  ) {
    docketsHubConnection.on(docketEvent, handler);
  }

  return {
    docket,
    isDocketLoading,
    addMovie,
    removeMovie,
    selectMovie,
    registerEventHandler,
  };
}

export default useDocket;
