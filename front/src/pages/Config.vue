<script lang="ts" setup>
import {useConfig} from '../composables/useConfig';

const {config} = await useConfig();
const string = JSON.stringify(config, null, 2);
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
