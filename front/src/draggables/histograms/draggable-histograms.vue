<script lang="ts" setup="">
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {InjectionKey} from 'src/common/injection-key';
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

useRefProvide(InjectionKey.histogramsIndicatorName, name);
useRefProvide(InjectionKey.histogramsOver, over);
useRefProvide(InjectionKey.histogramsFunction, histogramFunction);

useDraggableHistogramsLifecycles();
</script>

<template>
  <AppDraggable
    class="container"
    draggable-key="histograms"
  >
    <AppDraggableMenu>
      <h2>With</h2>
      <AppSelect
        :injection-key="InjectionKey.histogramsIndicatorName"
        :options="names ?? []"
        placeholder="Indicator..."
        size="small"
      />

      <h2>Over</h2>
      <AppSelect
        :injection-key="InjectionKey.histogramsOver"
        :options="overs"
        size="small"
      />

      <h2>Function</h2>
      <AppSelect
        :injection-key="InjectionKey.histogramsFunction"
        :options="histogramFunctions"
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
