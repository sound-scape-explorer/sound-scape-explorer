<script lang="ts" setup="">
import {useAppPlot} from 'src/app/plot/use-app-plot';

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
  hideXLegend?: boolean;
  showRange?: boolean;
}

const props = withDefaults(defineProps<AppPlotProps>(), {
  legend: false,
  clickEnabled: false,
  hideXLegend: false,
  showRange: false,
});

const {container} = useAppPlot(props);
</script>

<template>
  <div ref="container" />
</template>
