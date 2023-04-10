<script lang="ts" setup="">
import {useStorage} from '../../hooks/useStorage';

const {
  getSettings,
  getFiles,
  getBands,
  getIntegrations,
  getRanges,
  getReducers,
  getIndicatorNames,
  getVolumeNames,
} = await useStorage();

const settings = await getSettings();
const files = await getFiles();
const bands = await getBands();
const integrations = await getIntegrations();
const ranges = await getRanges();
const reducers = await getReducers();
const reducersToPrint = reducers.map((reducer) => `${reducer.name}${reducer.dimensions}`);
const indicators = await getIndicatorNames();
const volumes = await getVolumeNames();
</script>

<template>
  <div class="container">
    <div class="title">Settings</div>
    <code v-for="(value, index) in settings" class="item">
      <span class="key">{{ index }}</span>
      <span>{{ value }}</span>
    </code>
  </div>

  <div class="container">
    <code class="item">
      <span class="key">Files count</span>
      <span>{{ files.length }}</span>
    </code>
    <code class="item">
      <span class="key">Bands</span>
      <span>{{ Object.keys(bands) }}</span>
    </code>
    <code class="item">
      <span class="key">Integrations</span>
      <span>{{ integrations }}</span>
    </code>
    <code class="item">
      <span class="key">Ranges</span>
      <span>{{ ranges }}</span>
    </code>
    <code class="item">
      <span class="key">Reducers</span>
      <span>{{ reducersToPrint }}</span>
    </code>
    <code class="item">
      <span class="key">Indicators</span>
      <span>{{ indicators }}</span>
    </code>
    <code class="item">
      <span class="key">Volumes</span>
      <span>{{ volumes }}</span>
    </code>
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
