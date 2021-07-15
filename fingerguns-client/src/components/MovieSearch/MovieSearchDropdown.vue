<template>
  <div class="movie-search-box">
    <input
      type="text"
      placeholder="Start typing to see movie suggestions"
      v-model="query"
    />
    <movie-search-dropdown-results-list :searchResults="searchResults" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { debounce } from "lodash";

import MovieSearchDropdownResultsList from "./MovieSearchDropdownResultsList.vue";
import useMovies from "@/composables/useMovies";
import { MovieSearchResult } from "@/types";

export default defineComponent({
  components: { MovieSearchDropdownResultsList },
  data() {
    return {
      query: "",
      searchResults: [] as MovieSearchResult[],
    };
  },
  watch: {
    query(_1, newQuery) {
      if (newQuery.length && newQuery.length >= 3)
        debounce(this.handleSearchMovies, 500)();
    },
  },
  methods: {
    async handleSearchMovies() {
      if (!this.query?.trim().length) {
        this.searchResults = [];
        return;
      }

      const response = await this.searchMovies(this.query.trim());
      const searchResponse = response.data;
      this.searchResults = searchResponse;
    },
  },
  setup() {
    const { searchMovies } = useMovies;
    return { searchMovies };
  },
});
</script>

<style scoped>
.movie-search-box {
  position: relative;
}

input {
  padding: 0.5em;
  width: 100%;
  box-sizing: border-box;
}
</style>
