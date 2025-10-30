<script lang="ts" setup>
import {
  type Config,
  type Data,
  type Layout,
  type PlotlyHTMLElement,
} from 'plotly.js-dist-min';
import {useAppPlotLifecycles} from 'src/app/plot/use-app-plot-lifecycles';
import {type Ref, ref} from 'vue';

export interface AppPlotProps {
  labels: string[][];
  values: number[][];
  colors: string[];
  names?: string[];
  title?: string;
  xTitle?: string;
  yTitle?: string;
  legend?: boolean;
  exportFilename: string;
  clickEnabled?: boolean;
  hideXLegend?: boolean;
  showRange?: boolean;
  hoverTemplate?: 'default' | 'relative-trajectories';
  width?: number | null;
  height?: number | null;
  isExpanded?: boolean;
}

const props = withDefaults(defineProps<AppPlotProps>(), {
  legend: false,
  clickEnabled: false,
  hideXLegend: false,
  showRange: false,
  hoverTemplate: 'default',
  width: null,
  height: null,
  isExpanded: false,
});

export interface AppPlotRefs {
  container: Ref<HTMLDivElement | null>;
  data: Ref<Data[] | null>;
  layout: Ref<Partial<Layout> | null>;
  config: Ref<Partial<Config> | null>;
  plot: Ref<PlotlyHTMLElement | null>;
}

const container = ref<AppPlotRefs['container'] | null>(null);

const refs: AppPlotRefs = {
  container,
  data: ref(null),
  layout: ref(null),
  config: ref(null),
  plot: ref(null),
};

useAppPlotLifecycles(props, refs);
</script>

<template>
  <div ref="container" />
</template>
