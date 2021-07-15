<template>
  <div class="search-results" v-if="searchResults.length">
    <movie-search-dropdown-result
      v-for="searchResult in searchResults"
      :key="searchResult.id"
      :movieSearchResult="searchResult"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import MovieSearchDropdownResult from "./MovieSearchDropdownResult.vue";
import { MovieSearchResult } from "@/types";

export default defineComponent({
  components: { MovieSearchDropdownResult },
  props: {
    searchResults: {
      type: Array as PropType<MovieSearchResult[]>,
      required: true,
    },
  },
  methods: {
    getReleaseYear(releaseDate: string) {
      const date = new Date(releaseDate);
      return date.getFullYear();
    },
  },
});
</script>

<style scoped>
.search-results {
  position: absolute;
  width: 100%;
  height: 300px;
  overflow-y: scroll;
  border: 1px solid black;
}
</style>
