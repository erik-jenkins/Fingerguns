<template>
  <div class="pick-movie">
    <button @click.prevent="handlePickMovie">Pick movie</button>
    <transition name="fade">
      <p v-if="currentMovieIndex !== null">
        {{ movies[currentMovieIndex].title }}
      </p>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import useMoviesApi from "@/composables/useMoviesApi";
import confetti from "canvas-confetti";

export default defineComponent({
  data() {
    return {
      currentMovieIndex: null as number | null,
      isPickingMovie: false,
    };
  },
  methods: {
    async handlePickMovie() {
      if (!this.isPickingMovie) {
        this.isPickingMovie = true;
        await this.pickMovie();
      }
    },
    async handleMoviePicked(
      initialMovieIndex: number,
      selectionDelays: number[]
    ) {
      this.currentMovieIndex = initialMovieIndex;
      if (this.currentMovieIndex == null) return;

      for (let i = 0; i < selectionDelays.length; i++) {
        const currentDelay = selectionDelays[i];
        await sleep(currentDelay);
        const newMovieIndex: number =
          (this.currentMovieIndex + 1) % this.movies.length;
        this.currentMovieIndex = newMovieIndex;
      }

      this.isPickingMovie = false;
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    },
  },
  setup() {
    const { movies, registerEventHandler, pickMovie } = useMoviesApi();

    return { movies, registerEventHandler, pickMovie };
  },
  mounted() {
    this.registerEventHandler("MovieSelected", this.handleMoviePicked);
  },
});

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
</script>

<style lang="scss" scoped>
.pick-movie {
  margin-top: 1em;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
