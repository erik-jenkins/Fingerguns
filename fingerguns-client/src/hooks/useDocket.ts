import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";

import { Docket, Movie } from "types";

export enum DocketEvent {
  AddMovie = "AddMovie",
  MovieAdded = "MovieAdded",
  RemoveMovie = "RemoveMovie",
  MovieRemoved = "MovieRemoved",
  SelectMovie = "SelectMovie",
  MovieSelected = "MovieSelected",
}

export interface IDocketContext {
  docket: Docket | null;
  isDocketLoading: boolean;
  selected: ISelected | null;
  addMovie: (movieId: number) => Promise<void>;
  removeMovie: (movieId: number) => Promise<void>;
  selectMovie: () => void;
}

const defaultDocketContext: IDocketContext = {
  docket: null,
  isDocketLoading: false,
  selected: null,
  addMovie: (movieId) => Promise.resolve(),
  removeMovie: (movieId) => Promise.resolve(),
  selectMovie: () => {},
};

const docketsHubConnection = new HubConnectionBuilder()
  .withUrl("http://localhost:5000/docketshub")
  .build();

if (docketsHubConnection.state === HubConnectionState.Disconnected)
  docketsHubConnection.start();

interface ISelected {
  initialMovieIndex: number;
  numberOfDelays: number;
}

export const DocketContext =
  createContext<IDocketContext>(defaultDocketContext);

function useDocket(docketId: number): IDocketContext {
  const [docket, setDocket] = useState<Docket | null>(null);
  const [isDocketLoading, setIsDocketLoading] = useState(false);
  const [selected, setSelected] = useState<ISelected | null>(null);

  const loadDocket = useCallback(() => {
    setIsDocketLoading(true);
    axios
      .get<Docket>(`http://localhost:5000/api/dockets/${docketId}`)
      .then((response) => response.data)
      .then((docket) => {
        setIsDocketLoading(false);
        setDocket(docket);
      });
  }, [docketId]);

  useEffect(loadDocket, [loadDocket]);

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

  useEffect(() => {
    docketsHubConnection.on(
      DocketEvent.MovieSelected,
      function (initialMovieIndex: number, numberOfDelays: number) {
        setSelected({ initialMovieIndex, numberOfDelays });
      }
    );
  }, []);

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

  return {
    docket,
    isDocketLoading,
    selected,
    addMovie,
    removeMovie,
    selectMovie,
  };
}

export default useDocket;
