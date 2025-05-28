<script lang="ts" setup>
import {IonIcon} from '@ionic/vue';
import {downloadJson} from '@shared/browser';
import {inferFilename} from '@shared/config';
import {downloadOutline} from 'ionicons/icons';
import AppButton from 'src/app/app-button.vue';
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
      value: config.value.version,
    },
  ];

  for (const [k, v] of Object.entries(config.value.settings)) {
    payload.push({
      tag: k,
      value: v.toString(),
    });
  }

  payload.push({
    tag: 'file count',
    value: config.value.files.length.toString(),
  });

  payload.push({
    tag: 'extraction count',
    value: config.value.extractions.length.toString(),
  });

  return payload;
});

const download = () => {
  if (config.value === null) {
    return;
  }

  const filename = inferFilename(config.value);
  downloadJson(config.value, filename);
};
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <h2>Config</h2>

      <AppButton
        :handle-click="download"
        size="small"
        tooltip="Download .json"
        tooltip-placement="bottom"
      >
        <IonIcon :icon="downloadOutline" />
      </AppButton>
    </div>

    <AppGrid
      :columns="1"
      :items="items"
    />
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';
@use 'src/styles/scrolls';

.container {
  overflow: auto;
  width: sizes.$s0;
  max-height: sizes.$h0;
  margin-top: sizes.$p0;
  padding-right: sizes.$p0;
  text-align: right;
  text-wrap: stable;

  @include scrolls.tiny-scrollbar;
}

.header {
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  margin-bottom: sizes.$p0;
  padding: sizes.$g0 sizes.$p0;
  border-radius: sizes.$g0;
  background: v-bind('colors.actionColor');
}
</style>
