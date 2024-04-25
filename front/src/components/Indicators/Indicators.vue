<script lang="ts" setup>
import {DownloadOutline} from '@vicons/ionicons5';
import {NButton, NCascader, NIcon, NSelect, NSwitch} from 'naive-ui';
import {Csv} from 'src/common/Csv';
import AppDraggable from 'src/components/app/app-draggable.vue';
import AppPlot, {
  type AppPlotProps,
} from 'src/components/app/app-plot/app-plot.vue';
import {useDate} from 'src/composables/date';
import {useStorageAggregatedIndicators} from 'src/composables/storage-aggregated-indicators';
import {useStorageSites} from 'src/composables/storage-sites';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {computed, ref, watch} from 'vue';

import {cyclingScaleRef} from '../Scatter/useScatterColorScale';
import {indicatorDataRef, useIndicators} from './useIndicators';

const {aggregatedIndicators} = useStorageAggregatedIndicators();
const {selectIndicator, selectSites} = useIndicators();
const {convertTimestampToIsoDate} = useDate();

const parseIndex = (optionString: string | null): number | null => {
  if (optionString === null) {
    return null;
  }

  const stringElements = optionString.split(' ');
  return Number(stringElements[0]);
};

const indicatorsOptionsRef = computed(() => {
  if (aggregatedIndicators.value === null) {
    return [];
  }

  const options = aggregatedIndicators.value.map(
    (i) => `${i.extractor.index} - ${i.extractor.name}`,
  );

  return convertToNaiveSelectOptions(options);
});

const indicatorSelectedRef = ref<string>('');
watch(indicatorSelectedRef, () =>
  selectIndicator(parseIndex(indicatorSelectedRef.value)),
);

const {sites} = useStorageSites();

const sitesSelectedRef = ref([]);
const sitesOptionsRef = computed(() => {
  if (sites.value === null) {
    return [];
  }

  const names = sites.value.map((s) => s.name);
  return convertToNaiveSelectOptions(names);
});

const updateSites = (sitesNames: string[]) => {
  selectSites(sitesNames);
};

const isByDateRef = ref<boolean>(false);

const chartDataRef = computed<Omit<AppPlotProps, 'exportFilename'>>(() => {
  if (sites.value === null) {
    return {
      values: [],
      labels: [],
      colors: [],
    };
  }

  const values = indicatorDataRef.value.map((d) => d.values[0]);
  const timestamps = indicatorDataRef.value.map((d) => d.timestamp);
  const sitesValues = indicatorDataRef.value.map((d) => d.site);
  const sitesNames = sites.value.map((site) => site.name);
  const scale = cyclingScaleRef.value.colors(sitesNames.length + 1);

  const colors = indicatorDataRef.value.map(
    (d) => scale[sitesNames.indexOf(d.site)],
  );

  if (isByDateRef.value === false) {
    return {
      values: [values],
      labels: [
        timestamps.map(
          (t, i) =>
            `${convertTimestampToIsoDate(t)}<br>Site: ${
              sitesValues[i]
            }<br>Interval: ${i}`,
        ),
      ],
      colors: [colors],
    };
  }

  // sort
  const indices = Array.from({length: timestamps.length}, (_, i) => i);
  indices.sort((a, b) => timestamps[a] - timestamps[b]);

  return {
    values: [indices.map((i) => values[i])],
    labels: [
      indices.map(
        (i) =>
          `${convertTimestampToIsoDate(timestamps[i])}<br>Site: ${
            sitesValues[i]
          }<br>Interval: ${i}`,
      ),
    ],
    colors: [indices.map((i) => colors[i])],
  };
});

const handleExportClick = () => {
  const csv = new Csv();
  csv.addColumn('intervalIndex');
  csv.addColumn('site');
  csv.addColumn('timestamp');
  csv.addColumn('values');

  for (const d of indicatorDataRef.value) {
    csv.createRow();
    csv.addToCurrentRow(d.index.toString());
    csv.addToCurrentRow(d.site);
    csv.addToCurrentRow(convertTimestampToIsoDate(d.timestamp));
    csv.addToCurrentRow(d.values.join('; '));
  }

  csv.download('indicators');
};
</script>

<template>
  <AppDraggable draggable-key="indicators">
    <div class="container">
      <div class="row">
        <n-select
          v-model:value="indicatorSelectedRef"
          :options="indicatorsOptionsRef"
          class="sites"
          placeholder="Indicator..."
          size="small"
        />

        <n-cascader
          v-model:value="sitesSelectedRef"
          :cascade="false"
          :clear-filter-after-select="false"
          :filterable="true"
          :options="sitesOptionsRef"
          :show-path="false"
          check-strategy="child"
          class="cascader"
          clearable
          expand-trigger="click"
          max-tag-count="responsive"
          multiple
          placeholder="Select sites"
          size="small"
          width="800"
          @update:value="updateSites"
        />
      </div>

      <div class="row">
        <n-switch
          v-model:value="isByDateRef"
          class="toggle"
        >
          <template #unchecked>Sorted by site</template>
          <template #checked>Sorted by date</template>
        </n-switch>

        <n-button
          size="tiny"
          @click="handleExportClick"
        >
          <template #icon>
            <n-icon>
              <download-outline />
            </n-icon>
          </template>
          Export .csv
        </n-button>
      </div>

      <AppPlot
        :colors="chartDataRef.colors"
        :labels="chartDataRef.labels"
        :values="chartDataRef.values"
        export-filename="indicators"
      />
    </div>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.5rem;

  min-width: 40rem;
}

.row {
  display: grid;
  grid-template-columns: 10rem 1fr;
  gap: 1rem;

  width: 100%;
}

.cascader {
  max-width: 33rem;
}
</style>
