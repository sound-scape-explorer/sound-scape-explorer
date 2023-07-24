<script lang="ts" setup="">
import {computed} from 'vue';
import {settingsRef} from 'src/hooks/useStorageSettings';
import {configBandsRef} from 'src/hooks/useConfigBands';
import {configIntegrationsRef} from 'src/hooks/useConfigIntegrations';
import {configFilesRef} from 'src/hooks/useConfigFiles';
import {configRangesRef} from 'src/hooks/useConfigRanges';
import {configReducersRef} from 'src/hooks/useConfigReducers';

const reducerNamesRef = computed<string[] | null>(() => {
  if (configReducersRef.value === null) {
    return null;
  }

  return configReducersRef.value.map(
    (reducer) => `${reducer.name}${reducer.dimensions}`,
  );
});

const bandNamesRef = computed<string[] | null>(() => {
  if (configBandsRef.value === null) {
    return null;
  }

  return configBandsRef.value.map((band) => band.name);
});

const integrationNamesRef = computed<string[] | null>(() => {
  if (configIntegrationsRef.value === null) {
    return null;
  }

  return configIntegrationsRef.value.map((integration) => integration.name);
});

const rangeNamesRef = computed<string[] | null>(() => {
  if (configRangesRef.value === null) {
    return null;
  }

  return configRangesRef.value.map((range) => range.name);
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
        <span>{{ configFilesRef.value?.length }}</span>
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
