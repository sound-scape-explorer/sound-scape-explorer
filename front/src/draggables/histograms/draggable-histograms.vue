<script lang="ts" setup>
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {
  HistogramFunction,
  HistogramOver,
  useDraggableHistograms,
} from 'src/draggables/histograms/use-draggable-histograms';
import {useDraggableHistogramsLifecycles} from 'src/draggables/histograms/use-draggable-histograms-lifecycles';

const {divRef, names, name, over, fn} = useDraggableHistograms();

useDraggableHistogramsLifecycles();
</script>

<template>
  <AppDraggable
    :class="$style.container"
    draggable-key="histograms"
  >
    <AppDraggableMenu>
      <h2>With</h2>
      <AppSelect
        v-model="name"
        :options="names ?? []"
        placeholder="Indicator..."
        size="small"
      />

      <h2>Over</h2>
      <AppSelect
        v-model="over"
        :options="HistogramOver.options"
        size="small"
      />

      <h2>Function</h2>
      <AppSelect
        v-model="fn"
        :options="HistogramFunction.options"
        size="small"
      />
    </AppDraggableMenu>

    <div ref="divRef" />
  </AppDraggable>
</template>

<style lang="scss" module>
.container {
  width: 40em;
}
</style>
