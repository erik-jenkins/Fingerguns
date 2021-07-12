<template>
  <nav>
    <router-link :to="{ name: 'home' }">Fingerguns</router-link>
    <div class="nav-links">
      <div class="left">
        <router-link :to="{ name: 'moviepicker' }">Movie Picker</router-link>
      </div>
      <div class="right">
        <router-link :to="{ name: 'login' }">Login</router-link>
        <router-link :to="{ name: 'register' }">Register</router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Navbar",
});
</script>

<style lang="scss" scoped>
nav {
  padding: 1em;
  background: salmon;
  border-radius: 0 0 4px 4px;
  display: flex;
}

.nav-links {
  flex-grow: 1;
  margin-left: 1em;
  display: flex;
  justify-content: space-between;
}

.nav-links a {
  font-size: 12px;
}

.nav-links .left > * {
  margin-right: 1em;
}

.nav-links .right > * {
  margin-left: 1em;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.router-link-exact-active {
  text-decoration: underline;
}
</style>
