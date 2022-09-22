<script lang="ts" setup>
import {fetchConfig} from '../utils/fetch-config';

const config = await fetchConfig();
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
