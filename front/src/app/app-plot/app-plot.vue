<script lang="ts" setup="">
import {useAppPlot} from 'src/app/app-plot/app-plot';
import {settingsStore} from 'src/draggables/settings/settings-store';
import {watch} from 'vue';

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

const {divRef, refresh} = useAppPlot(props);

watch([props, settingsStore], refresh);
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
