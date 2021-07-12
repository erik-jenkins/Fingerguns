<template>
  <div class="form-group">
    <label for="access-code">Access Code</label>
    <input
      type="text"
      id="access-code"
      placeholder="ABCD-1234"
      v-model="accessCode"
    />
    <p class="form-field-text">For now, an access code is required to make an account.</p>
  </div>

  <div class="form-group">
    <label for="email">Email</label>
    <input
      type="email"
      id="email"
      placeholder="ericroberts@example.com"
      v-model="email"
    />
    <p class="form-field-text">We promise never to share your email address.</p>
  </div>

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
    <label for="confirm">Confirm</label>
    <input
      type="password"
      id="confirm"
      placeholder="supersecret!!!"
      v-model="confirm"
    />
  </div>

  <div class="form-group">
    <button>Register</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RegisterForm",
  data() {
    return {
      accessCode: "",
      email: "",
      username: "",
      password: "",
      confirm: "",
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

.form-field-text {
  margin: 0;
  font-size: 10px;
  color: gray;
}
</style>
