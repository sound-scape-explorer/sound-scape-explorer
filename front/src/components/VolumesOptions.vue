<script lang="ts" setup>
import {NP} from 'naive-ui';
import VolumesOptionsRange from './VolumesOptionsRange.vue';
import VolumesOptionsSites from './VolumesOptionsSites.vue';
import VolumesOptionsVariable from './VolumesOptionsVariable.vue';
import VolumesOptionsAggregate from './VolumesOptionsAggregate.vue';
import {useConfig} from '../composables/useConfig';

const {ranges, sites} = await useConfig();
</script>

<template>
  <n-p class="first-row">
    <VolumesOptionsRange :ranges="ranges" />
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
