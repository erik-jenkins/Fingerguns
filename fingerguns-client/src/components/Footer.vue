<template>
  <div class="footer">
    <p>Made by <a href="https://erikjenkins.com">Erik Jenkins</a> in 2021.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Footer'
})
</script>

<style lang="scss" scoped>
.footer {
  padding: 1em;
  flex-shrink: 0;
  background: #555;
  color: white;
  font-size: 14px;
  border-radius: 4px 4px 0 0;
}

.footer a {
  color: white;
}

.footer p {
  margin: 0;
}
</style>