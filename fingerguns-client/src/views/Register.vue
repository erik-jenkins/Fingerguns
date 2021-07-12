<template>
  <default-layout>
    <register-form />
  </default-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import RegisterForm from "@/components/Register/RegisterForm.vue";

export default defineComponent({
  name: "Register",
  components: { DefaultLayout, RegisterForm },
});
</script>
