<template>
  <ul v-if="docket?.movies.length">
    <li v-for="movie in docket.movies" :key="movie.id">
      <remove-movie :movie-id="movie.id" />
      {{ movie.title }}
    </li>
  </ul>
  <p v-else-if="isLoadingMovies">Loading movies ⏱...</p>
  <p v-else>No movies to display 😥</p>
</template>

<script lang="ts">
import { IDocketManager } from "@/composables/useDockets";
import { defineComponent, inject } from "vue";

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
    await this.loadDocket();
    this.isLoadingMovies = false;
  },
  setup() {
    const docketManager: IDocketManager | undefined = inject("docketManager");
    if (docketManager == null) throw Error();

    const { docket, loadDocket } = docketManager;
    return { docket, loadDocket };
  },
});
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
}
</style>
