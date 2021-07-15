<template>
  <movie-search-dropdown />
  <br />
  <button @click.prevent="handleAddMovie">Add movie!</button>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";

import MovieSearchDropdown from "@/components/MovieSearch/MovieSearchDropdown.vue";
import { IDocketManager } from "@/composables/useDockets";

export default defineComponent({
  components: {MovieSearchDropdown},
  data() {
    return {
      movieTitle: "",
    };
  },
  methods: {
    handleAddMovie() {
      if (this.movieTitle === "") return;

      this.addMovie(649006);
      this.movieTitle = "";
    },
  },
  setup() {
    const docketManager: IDocketManager | undefined = inject("docketManager");
    if (docketManager == null) throw Error();

    const { addMovie } = docketManager;
    return { addMovie };
  },
});
</script>

<style lang="scss" scoped>
input {
  margin-right: 0.5rem;
}
</style>
