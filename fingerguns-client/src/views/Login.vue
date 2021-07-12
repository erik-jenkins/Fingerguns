<template>
  <default-layout>
    <login-form />
  </default-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import LoginForm from "@/components/Login/LoginForm.vue";

export default defineComponent({
  name: "Login",
  components: { DefaultLayout, LoginForm },
});
</script>
