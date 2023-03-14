<script lang="ts" setup>
const string = JSON.stringify({placeholder: true}, null, 2);
</script>

<template>
  <div class="config">
    {{ string }}
  </div>
</template>

<style lang="scss" scoped>
.config {
  margin: 0;
  font-family: 'Courier New', monospace;
  white-space: pre;
}
</style>
