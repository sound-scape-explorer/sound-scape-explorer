<script lang="ts" setup>
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {DraggableKey} from 'src/composables/use-draggables';
import {useSites} from 'src/composables/use-sites';
import {
  HistogramFunction,
  HistogramOver,
  useDraggableHistograms,
} from 'src/draggables/histograms/use-draggable-histograms';
import {useDraggableHistogramsLifecycles} from 'src/draggables/histograms/use-draggable-histograms-lifecycles';
import {computed, ref, watch} from 'vue';

const {
  divRef,
  acousticsExtractors,
  over,
  fn,
  acousticsExtractorSlug: slug,
  extractorToSlug,
  slugToExtractor,
} = useDraggableHistograms();

// TODO: to remove all
const {sites} = useSites();

const siteName = ref<string | null>(null);
const slugs = computed(() => acousticsExtractors.value.map(extractorToSlug));

watch([slug, siteName], async () => {
  if (slug.value === null || siteName.value === null) {
    return;
  }

  const ex = slugToExtractor(slug.value);
  // const data = await read(ex, siteName.value);
  // await render(data);
});

useDraggableHistogramsLifecycles();
</script>

<template>
  <AppDraggable
    :class="$style.container"
    :draggable-key="DraggableKey.enum.histograms"
  >
    <AppDraggableMenu>
      <h2>With</h2>
      <AppSelect
        v-model="slug"
        :options="slugs"
        placeholder="Acoustic indicator..."
        size="small"
      />

      <h2>Site</h2>

      <AppSelect
        v-model="siteName"
        :options="sites.map((s) => s.name)"
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
