<script lang="ts" setup="">
import {watch} from 'vue';

import {useAppPlot} from './useAppPlot';

export interface AppPlotProps {
  labels: string[][];
  values: number[][];
  colors: string[];
  title?: string;
}

const props = defineProps<AppPlotProps>();

const {divRef, refresh} = useAppPlot(props);

watch(props, refresh);
</script>

<template>
  <span
    ref="divRef"
    class="histogram"
  />
</template>

<style lang="scss" scoped>
.histogram {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
