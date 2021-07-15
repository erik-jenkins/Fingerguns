<template>
  <div class="pick-movie">
    <button @click.prevent="handleSelectMovie">Pick movie</button>
    <transition name="fade">
      <p v-if="currentMovieIndex !== null">
        {{ docket.movies[currentMovieIndex].title }}
      </p>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";

import { DocketEvent, IDocketManager } from "@/composables/useDockets";
import confetti from "canvas-confetti";

export default defineComponent({
  data() {
    return {
      currentMovieIndex: null as number | null,
      isSelectingMovie: false,
    };
  },
  methods: {
    async handleSelectMovie() {
      if (!this.isSelectingMovie) {
        this.isSelectingMovie = true;
        await this.selectMovie();
      }
    },
    async handleMovieSelected(
      initialMovieIndex: number,
      selectionDelays: number[]
    ) {
      this.currentMovieIndex = initialMovieIndex;
      if (this.currentMovieIndex == null) return;
      if (this.docket == null) return;

      for (let i = 0; i < selectionDelays.length; i++) {
        const currentDelay = selectionDelays[i];
        await sleep(currentDelay);
        const newMovieIndex: number =
          (this.currentMovieIndex + 1) % this.docket.movies.length;
        this.currentMovieIndex = newMovieIndex;
      }

      this.isSelectingMovie = false;
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    },
  },
  setup() {
    const docketManager: IDocketManager | undefined = inject("docketManager");
    if (docketManager == null) throw Error();

    const { docket, selectMovie, registerEventHandler } = docketManager;
    return { docket, selectMovie, registerEventHandler };
  },
  mounted() {
    this.registerEventHandler(
      DocketEvent.MOVIE_SELECTED,
      this.handleMovieSelected
    );
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
