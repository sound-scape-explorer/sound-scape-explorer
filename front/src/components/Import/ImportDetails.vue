<script lang="ts" setup="">
import {computed} from 'vue';
import {reducersRef} from 'src/hooks/useStorageReducers';
import {useStorageBands} from 'src/hooks/useStorageBands';
import {useStorageIntegrations} from 'src/hooks/useStorageIntegrations';
import {useStorageRanges} from 'src/hooks/useStorageRanges';
import {filenamesRef} from 'src/hooks/useStorageFilenames';
import {settingsRef} from 'src/hooks/useStorageSettings';

const {bandsRef} = useStorageBands();
const {integrationsRef} = useStorageIntegrations();
const {rangesRef} = useStorageRanges();

const reducerNamesRef = computed(() => {
  if (reducersRef.value === null) {
    return;
  }

  return reducersRef.value.map(
    (reducer) => `${reducer.name}${reducer.dimensions}`,
  );
});

const bandNamesRef = computed(() => {
  if (bandsRef.value === null) {
    return;
  }

  return Object.keys(bandsRef.value);
});

const integrationNamesRef = computed(() => {
  if (integrationsRef.value === null) {
    return;
  }

  return Object.keys(integrationsRef.value);
});

const rangeNamesRef = computed(() => {
  if (rangesRef.value === null) {
    return;
  }

  return Object.keys(rangesRef.value);
});
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <div class="title">Settings</div>
      <code
        v-for="(value, index) in settingsRef.value"
        class="item"
      >
        <span class="key">{{ index }}</span>
        <span>{{ value }}</span>
      </code>
    </div>

    <div class="container">
      <code class="item">
        <span class="key">Files count</span>
        <span>{{ filenamesRef.value?.length }}</span>
      </code>
      <code class="item">
        <span class="key">Bands</span>
        <span>{{ bandNamesRef }}</span>
      </code>
      <code class="item">
        <span class="key">Integrations</span>
        <span>{{ integrationNamesRef }}</span>
      </code>
      <code class="item">
        <span class="key">Ranges</span>
        <span>{{ rangeNamesRef }}</span>
      </code>
      <code class="item">
        <span class="key">Reducers</span>
        <span>{{ reducerNamesRef }}</span>
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
