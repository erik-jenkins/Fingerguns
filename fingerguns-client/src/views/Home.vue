<template>
  <div class="home">
    <default-layout>
      <jumbotron />
    </default-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import Jumbotron from "@/components/Home/Jumbotron.vue";

export default defineComponent({
  name: "Home",
  components: { DefaultLayout, Jumbotron },
});
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}
</style>
