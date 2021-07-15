import { Ref, ref } from "vue";
import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";

import { Docket, Movie } from "@/types";
import axios from "axios";

export enum DocketEvent {
  ADD_MOVIE = "AddMovie",
  MOVIE_ADDED = "MovieAdded",
  REMOVE_MOVIE = "RemoveMovie",
  MOVIE_REMOVED = "MovieRemoved",
  SELECT_MOVIE = "SelectMovie",
  MOVIE_SELECTED = "MovieSelected",
}

export interface IDocketManager {
  docket: Ref<Docket | null | undefined>;
  loadDocket: () => Promise<void>;
  addMovie: (movieId: number) => Promise<void>;
  removeMovie: (movieId: number) => Promise<void>;
  selectMovie: () => Promise<void>;
  registerEventHandler: (
    event: DocketEvent,
    handler: (...args: any[]) => void
  ) => void;
}

export default function(docketId: number): IDocketManager {
  const docketsHubConnection = new HubConnectionBuilder()
    .withUrl("http://localhost:5000/docketshub")
    .build();

  if (docketsHubConnection.state === HubConnectionState.Disconnected)
    docketsHubConnection.start();

  const docket = ref<Docket | null>();

  docketsHubConnection.on(DocketEvent.MOVIE_ADDED, (addedMovie: Movie) => {
    docket.value?.movies.push(addedMovie);
  });

  docketsHubConnection.on(DocketEvent.MOVIE_REMOVED, (removedMovie: Movie) => {
    if (docket.value == null) return;

    const newMovies = [...docket.value.movies].filter(
      (movie) => movie.id !== removedMovie.id
    );
    docket.value.movies = newMovies;
  });

  return {
    docket,
    async loadDocket(): Promise<void> {
      const response = await axios.get<Docket>(
        `http://localhost:5000/api/dockets/${docketId}`
      );
      docket.value = response.data;
    },
    addMovie(movieId: number): Promise<void> {
      return docketsHubConnection.send(
        DocketEvent.ADD_MOVIE,
        docketId,
        movieId
      );
    },
    removeMovie(movieId: number): Promise<void> {
      return docketsHubConnection.send(
        DocketEvent.REMOVE_MOVIE,
        docketId,
        movieId
      );
    },
    selectMovie(): Promise<void> {
      return docketsHubConnection.send(DocketEvent.SELECT_MOVIE, docketId);
    },
    registerEventHandler(
      eventName: DocketEvent,
      handler: (...args: any[]) => void
    ) {
      docketsHubConnection.on(eventName, handler);
    },
  };
}
