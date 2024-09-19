<script lang="ts" setup="">
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {useDraggableHistograms} from 'src/draggables/histograms/use-draggable-histograms';
import {useDraggableHistogramsLifecycles} from 'src/draggables/histograms/use-draggable-histograms-lifecycles';

const {
  divRef,
  names,
  name,
  overs,
  over,
  histogramFunctions,
  histogramFunction,
} = useDraggableHistograms();

useRefProvide('histograms/indicatorName', name);
useRefProvide('histograms/over', over);
useRefProvide('histograms/function', histogramFunction);

useDraggableHistogramsLifecycles();
</script>

<template>
  <AppDraggable
    class="container"
    draggable-key="histograms"
  >
    <AppDraggableMenu size="large">
      <h2>With</h2>
      <AppSelect
        :options="names ?? []"
        injection-key="histograms/indicatorName"
        placeholder="Indicator..."
        size="small"
      />

      <h2>Over</h2>
      <AppSelect
        :options="overs"
        injection-key="histograms/over"
        size="small"
      />

      <h2>Function</h2>
      <AppSelect
        :options="histogramFunctions"
        injection-key="histograms/function"
        size="small"
      />
    </AppDraggableMenu>

    <div ref="divRef" />
  </AppDraggable>
</template>

<style lang="scss" scoped>
.container {
  width: 40em;
}
</style>
