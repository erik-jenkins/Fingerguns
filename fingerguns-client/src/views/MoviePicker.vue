<template>
  <default-layout>
    <list-movies />
    <add-movie />
    <pick-movie />
  </default-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import ListMovies from "@/components/MoviePicker/ListMovies.vue";
import AddMovie from "@/components/MoviePicker/AddMovie.vue";
import PickMovie from "@/components/MoviePicker/PickMovie.vue";

export default defineComponent({
  components: { DefaultLayout, ListMovies, AddMovie, PickMovie },
});
</script>
