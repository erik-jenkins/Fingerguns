<template>
  <button @click.prevent="handleRemoveMovie">x</button>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";

import { IDocketManager } from "@/composables/useDockets";

export default defineComponent({
  props: {
    movieId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    handleRemoveMovie() {
      this.removeMovie(this.movieId);
    },
  },
  setup() {
    const docketManager: IDocketManager | undefined = inject("docketManager");
    if (docketManager == null) throw Error();

    const { removeMovie } = docketManager;
    return { removeMovie };
  },
});
</script>
