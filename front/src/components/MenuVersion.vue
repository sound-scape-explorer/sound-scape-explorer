<script lang="ts" setup="">
import {computed} from 'vue';
import {useConfig} from '../composables/useConfig';

const config = await useConfig();

const appVersion = import.meta.env.VITE_SSE_VERSION || '';
const appString = `SSE ${appVersion}`;

const dataVersion = computed(() => config.version);
const dataString = `Data ${dataVersion.value}`;
console.log();
</script>

<template>
  <div class="container">
    <span>{{ appString }}</span>
    <span>{{ dataString }}</span>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  position: absolute;
  bottom: 0;

  width: 100%;
  padding-bottom: 0.3rem;

  font-size: 0.7rem;
  user-select: none;
}
</style>
