<template>
  <default-layout>
    <pick-movie />
    <list-movies />
    <add-movie />
  </default-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import ListMovies from "@/components/Docket/ListMovies.vue";
import AddMovie from "@/components/Docket/AddMovie.vue";
import PickMovie from "@/components/Docket/PickMovie.vue";
import useDockets from "@/composables/useDockets";

export default defineComponent({
  components: { DefaultLayout, ListMovies, AddMovie, PickMovie },
  provide() {
    const docketId = Number.parseInt(this.$route.params.docketId[0]);
    const docketManager = useDockets(docketId);
    return {
      docketManager,
    };
  },
});
</script>
