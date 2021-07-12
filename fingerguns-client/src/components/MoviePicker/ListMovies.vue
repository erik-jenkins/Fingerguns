<template>
  <ul v-if="movies.length">
    <li v-for="movie in movies" :key="movie.id">
      <remove-movie :movie="movie" />
      {{ movie.title }}
    </li>
  </ul>
  <p v-else-if="isLoadingMovies">Loading movies ⏱...</p>
  <p v-else>No movies to display 😥</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import useMoviesApi from "@/composables/useMoviesApi";
import RemoveMovie from "./RemoveMovie.vue";

export default defineComponent({
  components: { RemoveMovie },
  data() {
    return {
      isLoadingMovies: false,
    };
  },
  async mounted() {
    this.isLoadingMovies = true;
    await this.fetchMovies();
    this.isLoadingMovies = false;
  },
  setup() {
    const { movies, fetchMovies, addMovie } = useMoviesApi();

    return { movies, fetchMovies, addMovie };
  },
});
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
}
</style>
