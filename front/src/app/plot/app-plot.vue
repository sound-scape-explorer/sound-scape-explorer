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
  clickEnabled?: boolean;
}

const props = defineProps<AppPlotProps>();

const {container} = useAppPlot(props);
</script>

<template>
  <span
    ref="container"
    class="app-plot"
  />
</template>

<style lang="scss" scoped>
.app-plot {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
