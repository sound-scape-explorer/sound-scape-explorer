<script lang="ts" setup="">
import {computed} from 'vue';
import {useConfig} from '../composables/useConfig';

const config = await useConfig();

const appTitle = 'SSE';
const appVersion = import.meta.env.VITE_SSE_VERSION || '';

const dataTitle = 'Data';
const dataVersion = computed(() => config.version);

const isSameVersion = appVersion === dataVersion.value;

const containerClasses = computed(() => {
  let payload = 'container';

  if (isSameVersion) {
    payload += ' success';
  } else {
    payload += ' warning';
  }

  return payload;
});
</script>

<template>
  <div :class="containerClasses">
    <div class="row">
      <span>{{ appTitle }}</span>
      <span>{{ appVersion }}</span>
    </div>
    <div class="row">
      <span>{{ dataTitle }}</span>
      <span>{{ dataVersion }}</span>
    </div>
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
  padding: 0.1rem 0.3rem;

  font-size: 0.7rem;
  user-select: none;
}

.row {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.success {
  background: rgba(158, 235, 71, 0.3);
}

.warning {
  background: rgba(255, 188, 71, 0.3);
}
</style>
