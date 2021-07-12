<template>
  <div class="jumbotron">
    <h1>Welcome to Fingerguns!</h1>
    <p>Some fun things you can do here:</p>
    <ul>
      <li>
        <router-link :to="{ name: 'moviepicker' }">Pick</router-link> a movie to
        watch tonight!
      </li>
      <li>
        <router-link to="#">Track</router-link> the movies you've watched!
      </li>
    </ul>
    <p>
      To get started, head over to the
      <router-link :to="{ name: 'register' }">Register</router-link> page and
      make an account!
    </p>
    <p class="icon">👉 👉</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Jumbotron",
});
</script>

<style lang="scss">
.home .page-container {
  margin: 1em 0;
}
</style>

<style lang="scss" scoped>
.jumbotron {
  background: #EEE;
  padding: 1em;
  box-sizing: padding-box;
}

.icon {
  margin: 0.5em 0;
  font-size: 2em;
}
</style>
