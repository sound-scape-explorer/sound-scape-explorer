<script lang="ts" setup>
import {useColorSelection} from 'src/components/scatter/use-color-selection';
import {useScatter} from 'src/components/scatter/use-scatter';
import {useScatterColorAlpha} from 'src/components/scatter/use-scatter-color-alpha';
import {useScatterConfig} from 'src/components/scatter/use-scatter-config';
import {useScatterFilterLabel} from 'src/components/scatter/use-scatter-filter-label';
import {useScatterFilterTemporal} from 'src/components/scatter/use-scatter-filter-temporal';
import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {useScatterTraces} from 'src/components/scatter/use-scatter-traces';
import {useScreen} from 'src/components/screen/use-screen';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useColorByIndicator} from 'src/draggables/colors/use-color-by-indicator';
import {onMounted, watch} from 'vue';

const {traces, isEnabled, generate, renderTraces} = useScatterTraces();
const {config} = useScatterConfig();
const {
  container,
  isLocked,
  isMounted,
  isAttached,
  mount,
  attachListeners,
  render,
} = useScatter();
const {criteria, flavor} = useColorSelection();
const {low: opacityLow, high: opacityHigh} = useScatterColorAlpha();
const {timeShift, isColorMapSwapped} = useClientSettings();
const {filtered: labelFiltered} = useScatterFilterLabel();
const {filtered: timeFiltered} = useScatterFilterTime();
const {filtered: temporalFiltered} = useScatterFilterTemporal();
const {selected} = useScreen();
const {isWebGlScatter2d} = useClientSettings();
const {min: rangeMin, max: rangeMax} = useColorByIndicator();

onMounted(mount);

watch([container, isMounted, isAttached], attachListeners);
watch([container, traces, isMounted, isAttached, config], render);

let isRendering = false;

watch(
  [
    criteria,
    flavor,
    opacityLow,
    opacityHigh,
    rangeMin,
    rangeMax,
    timeShift,
    labelFiltered,
    timeFiltered,
    temporalFiltered,
    selected,
    isWebGlScatter2d,
    isColorMapSwapped,
  ],
  async () => {
    if (isRendering || !isEnabled.value) {
      return;
    }

    isRendering = true;
    await generate();
    renderTraces();
    isRendering = false;
  },
);
</script>

<template>
  <div
    ref="container"
    :style="{'--pointer-events': isLocked ? 'none' : 'all'}"
    class="container"
  />
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  pointer-events: var(--pointer-events);
  overflow: hidden;
}
</style>
