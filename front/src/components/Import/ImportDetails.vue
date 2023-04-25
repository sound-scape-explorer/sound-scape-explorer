<script lang="ts" setup="">
import {computed} from 'vue';
import {storage} from '../../storage/storage';
import {useStorage} from '../../storage/useStorage';

const {isReadyRef} = await useStorage();

const reducersToPrint = computed(() => {
  if (storage.reducers === null) {
    return;
  }

  return storage.reducers.map(
    (reducer) => `${reducer.name}${reducer.dimensions}`,
  );
});

const bandsRef = computed(() => {
  if (storage.bands === null) {
    return;
  }

  return Object.keys(storage.bands);
});

const integrationsRef = computed(() => {
  if (storage.integrations === null) {
    return;
  }

  return Object.keys(storage.integrations);
});

const rangesRef = computed(() => {
  if (storage.ranges === null) {
    return;
  }

  return Object.keys(storage.ranges);
});
</script>

<template>
  <div
    v-if="isReadyRef"
    class="wrapper"
  >
    <div class="container">
      <div class="title">Settings</div>
      <code
        v-for="(value, index) in storage.settings"
        class="item"
      >
        <span class="key">{{ index }}</span>
        <span>{{ value }}</span>
      </code>
    </div>

    <div class="container">
      <code class="item">
        <span class="key">Files count</span>
        <span>{{ storage.files?.length }}</span>
      </code>
      <code class="item">
        <span class="key">Bands</span>
        <span>{{ bandsRef }}</span>
      </code>
      <code class="item">
        <span class="key">Integrations</span>
        <span>{{ integrationsRef }}</span>
      </code>
      <code class="item">
        <span class="key">Ranges</span>
        <span>{{ rangesRef }}</span>
      </code>
      <code class="item">
        <span class="key">Reducers</span>
        <span>{{ reducersToPrint }}</span>
      </code>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$width: 10rem;

.container {
  margin-top: 1rem;
}

.title {
  background: #443205;
  color: white;
  font-weight: bold;
  width: $width;
}

.item {
  display: grid;
  grid-template-columns: $width 1fr;
}

.key {
  background: #ffffa6;
  font-weight: bold;
}
</style>
