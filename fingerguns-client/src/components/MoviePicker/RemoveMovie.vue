<template>
  <button @click.prevent="handleRemoveMovie">x</button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Movie } from "@/types";
import useMoviesApi from "@/composables/useMoviesApi";

export default defineComponent({
  props: {
    movie: {
      type: Object as PropType<Movie>,
      required: true,
    },
  },
  methods: {
    handleRemoveMovie() {
      this.removeMovie(this.movie.id);
    },
  },
  setup() {
    const { removeMovie } = useMoviesApi();
    return { removeMovie };
  },
});
</script>
