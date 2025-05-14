<script lang="ts" setup>
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

useRefProvide(InjectionKey.enum.HISTOGRAMS_INDICATOR_NAME, name);
useRefProvide(InjectionKey.enum.HISTOGRAMS_OVER, over);
useRefProvide(InjectionKey.enum.HISTOGRAMS_FUNCTION, histogramFunction);

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
        :injection-key="InjectionKey.enum.HISTOGRAMS_INDICATOR_NAME"
        :options="names ?? []"
        placeholder="Indicator..."
        size="small"
      />

      <h2>Over</h2>
      <AppSelect
        :injection-key="InjectionKey.enum.HISTOGRAMS_OVER"
        :options="overs"
        size="small"
      />

      <h2>Function</h2>
      <AppSelect
        :injection-key="InjectionKey.enum.HISTOGRAMS_FUNCTION"
        :options="histogramFunctions"
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
