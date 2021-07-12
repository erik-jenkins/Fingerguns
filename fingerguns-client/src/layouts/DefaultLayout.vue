<template>
  <div class="wrap">
    <Navbar />
    <div class="page-container">
      <slot></slot>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  name: "DefaultLayout",
  components: { Navbar, Footer },
});
</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.page-container {
  margin: 1em;
  flex: 1 0 auto;
}
</style>
