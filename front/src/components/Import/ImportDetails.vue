<script lang="ts" setup="">
import {bandsRef} from 'src/hooks/useBands';
import {filesRef} from 'src/hooks/useFiles';
import {integrationsRef} from 'src/hooks/useIntegrations';
import {rangesRef} from 'src/hooks/useRanges';
import {reducersRef} from 'src/hooks/useReducers';
import {settingsRef} from 'src/hooks/useStorageSettings';
import {computed} from 'vue';

const reducerNamesRef = computed<string[] | null>(() => {
  if (reducersRef.value === null) {
    return null;
  }

  return reducersRef.value.map(
    (reducer) => `${reducer.name}${reducer.dimensions}`,
  );
});

const bandNamesRef = computed<string[] | null>(() => {
  if (bandsRef.value === null) {
    return null;
  }

  return bandsRef.value.map((band) => band.name);
});

const integrationNamesRef = computed<string[] | null>(() => {
  if (integrationsRef.value === null) {
    return null;
  }

  return integrationsRef.value.map((integration) => integration.name);
});

const rangeNamesRef = computed<string[] | null>(() => {
  if (rangesRef.value === null) {
    return null;
  }

  return rangesRef.value.map((range) => range.name);
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
        <span>{{ filesRef.value?.length }}</span>
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
$width: 14rem;

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
