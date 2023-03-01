<script lang="ts" setup>
import {NP} from 'naive-ui';
import {useStorage} from '../composables/useStorage';
import VolumesOptionsAggregate from './VolumesOptionsAggregate.vue';
import VolumesOptionsRange from './VolumesOptionsRange.vue';
import VolumesOptionsSites from './VolumesOptionsSites.vue';
import VolumesOptionsVariable from './VolumesOptionsVariable.vue';

const {
  getStorageRanges,
  getFilesSites,
} = await useStorage();

const ranges = await getStorageRanges();
const sites = await getFilesSites();
</script>

<template>
  <n-p class="first-row">
    <VolumesOptionsRange :ranges="Object.keys(ranges)" />
    <VolumesOptionsSites :sites="sites" />
    <VolumesOptionsVariable class="variable" />
  </n-p>

  <n-p class="second-row">
    <VolumesOptionsAggregate />
  </n-p>
</template>

<style lang="scss" scoped>
.first-row {
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 0.5rem;
}

.second-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 0.5rem;
  height: 2rem;
}

.variable {
  width: 20rem;
}
</style>
