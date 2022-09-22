<script lang="ts" setup>
const request = await fetch('http://localhost:9876/generated/ghost-config.json');
const config = await request.json();
const string = JSON.stringify(config, null, 2);
</script>

<template>
  <div class="config">
    {{ string }}
  </div>
</template>

<style lang="scss">
.config {
  margin: 0;
  font-family: 'Courier New', monospace;
  white-space: pre;
}
</style>
