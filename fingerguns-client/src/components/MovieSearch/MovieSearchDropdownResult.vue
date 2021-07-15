<template>
  <div class="movie-result">
    {{ movieSearchResult.title }}
  </div>
</template>

<script lang="ts">
import { MovieSearchResult } from '@/types'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    movieSearchResult: {
      type: Object as PropType<MovieSearchResult>,
      required: true,
    }
  }
})
</script>

<style lang="scss" scoped>
.movie-result {
  padding: 1em;
  border: 1px solid black;
  background: white;
}
</style>