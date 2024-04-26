<script lang="ts" setup="">
import {useAppPlot} from 'src/app/plot/app-plot';

export interface AppPlotProps {
  labels: string[][];
  values: number[][];
  names?: string[];
  colors?: string[][];
  title?: string;
  xTitle?: string;
  yTitle?: string;
  legend?: boolean;
  exportFilename: string;
}

const props = defineProps<AppPlotProps>();

const {divRef} = useAppPlot(props);
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
