<script lang="ts" setup>
import {useColorSelection} from 'src/components/scatter/color-selection';
import {useScatter} from 'src/components/scatter/scatter';
import {useScatterColorAlpha} from 'src/components/scatter/scatter-color-alpha';
import {useScatterConfig} from 'src/components/scatter/scatter-config';
import {useScatterFilterLabel} from 'src/components/scatter/scatter-filter-label';
import {useScatterFilterTime} from 'src/components/scatter/scatter-filter-time';
import {useScatterTraces} from 'src/components/scatter/scatter-traces';
import {useScreen} from 'src/components/screen/screen';
import {useClientSettings} from 'src/composables/client-settings';
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
const {type, flavor} = useColorSelection();
const {low, high} = useScatterColorAlpha();
const {timeShift} = useClientSettings();
const {filtered: labelFiltered} = useScatterFilterLabel();
const {filtered: timeFiltered} = useScatterFilterTime();
const {selected} = useScreen();
const {scatter2dGl} = useClientSettings();

onMounted(mount);

watch([container, isMounted, isAttached], attachListeners);
watch([container, traces, isMounted, isAttached, config], render);

let isRendering = false;

watch(
  [
    type,
    flavor,
    low,
    high,
    timeShift,
    labelFiltered,
    timeFiltered,
    selected,
    scatter2dGl,
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
