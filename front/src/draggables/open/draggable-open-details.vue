<script lang="ts" setup>
import AppGrid, {type AppGridItem} from 'src/app/app-grid.vue';
import {useConfig} from 'src/composables/use-config';
import {useThemeColors} from 'src/composables/use-theme-colors';
import {computed} from 'vue';

const {config} = useConfig();
const {colors} = useThemeColors();

const items = computed(() => {
  if (config.value === null) {
    return [];
  }

  const payload: AppGridItem[] = [
    {
      tag: 'version',
      tagValue: config.value.version,
    },
  ];

  for (const [k, v] of Object.entries(config.value.settings)) {
    payload.push({
      tag: k,
      tagValue: v.toString(),
    });
  }

  payload.push({
    tag: 'file count',
    tagValue: config.value.files.length.toString(),
  });

  payload.push({
    tag: 'extraction count',
    tagValue: config.value.extractions.length.toString(),
  });

  return payload;
});
</script>

<template>
  <h2 :class="[$style.title]">Config</h2>

  <AppGrid
    :columns="1"
    :items="items"
  />
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.title {
  font-weight: bold;
  margin: sizes.$p0 0;
  padding: sizes.$g0 sizes.$p0;
  border-radius: sizes.$g0;
  background: v-bind('colors.actionColor');
}
</style>
