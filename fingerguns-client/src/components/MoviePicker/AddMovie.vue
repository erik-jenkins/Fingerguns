<template>
  <input
    type="text"
    placeholder="Enter movie title"
    v-model="movieTitle"
    @keyup.enter="handleAddMovie"
  />
  <button @click.prevent="handleAddMovie">Add movie!</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import useMoviesApi from "@/composables/useMoviesApi";

export default defineComponent({
  data() {
    return {
      movieTitle: "",
    };
  },
  methods: {
    handleAddMovie() {
      if (this.movieTitle === "") return;

      this.addMovie(this.movieTitle);
      this.movieTitle = "";
    },
  },
  setup() {
    const { addMovie } = useMoviesApi();
    return { addMovie };
  },
});
</script>

<style lang="scss" scoped>
input {
  margin-right: 0.5rem;
}
</style>