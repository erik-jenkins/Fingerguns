import { ref } from "vue";
import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";

import { Movie } from "@/types";
import axios from "axios";

const movieHubConnection = new HubConnectionBuilder()
  .withUrl("http://localhost:5000/movieshub")
  .build();

if (movieHubConnection.state === HubConnectionState.Disconnected)
  movieHubConnection.start();

const movies = ref<Movie[]>([]);
const initialMovieIndex = ref<number | null>(null);
const selectionDelays = ref<number[] | null>(null);

async function fetchMovies() {
  const response = await axios.get<Movie[]>("http://localhost:5000/api/movies");
  const fetchedMovies = response.data;
  movies.value = fetchedMovies;
}

function addMovie(movieTitle: string): Promise<void> {
  return movieHubConnection.send("AddMovie", movieTitle);
}

movieHubConnection.on("MovieAdded", (newMovie: Movie) => {
  movies.value.push(newMovie);
});

function removeMovie(movieId: number): Promise<void> {
  return movieHubConnection.send("RemoveMovie", movieId);
}

movieHubConnection.on("MovieRemoved", (removedMovie: Movie) => {
  const newMovies = movies.value.filter(
    (movie) => movie.id !== removedMovie.id
  );

  movies.value = newMovies;
});

function pickMovie(): Promise<void> {
  return movieHubConnection.send("SelectMovie", movies.value.length);
}

const registerEventHandler = (
  eventName: string,
  handler: (...args: any[]) => void
) => movieHubConnection.on(eventName, handler);

movieHubConnection.on("MovieSelected", (index: number, delays: number[]) => {
  initialMovieIndex.value = index;
  selectionDelays.value = delays;
});

export default function() {
  return {
    movies,
    initialMovieIndex,
    selectionDelays,
    registerEventHandler,
    fetchMovies,
    addMovie,
    removeMovie,
    pickMovie,
  };
}
