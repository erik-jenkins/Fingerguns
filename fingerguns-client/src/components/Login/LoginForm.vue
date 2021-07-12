<template>
  <div class="form-group">
    <label for="username">Username</label>
    <input
      type="text"
      id="username"
      placeholder="eroberts11"
      v-model="username"
    />
  </div>

  <div class="form-group">
    <label for="password">Password</label>
    <input
      type="password"
      id="password"
      placeholder="supersecret!!!"
      v-model="password"
    />
  </div>

  <div class="form-group">
    <button>Login</button>
  </div>

  <div class="form-group">
    <a href="#" style="font-size: 12px;">Forgot password?</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
    };
  },
});
</script>

<style lang="scss" scoped>
.form-group {
  margin-bottom: 1em;
}

.form-group label {
  display: block;
}

input {
  min-width: 200px;
}
</style>
