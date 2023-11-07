<script lang="ts" setup>
import {DownloadOutline} from '@vicons/ionicons5';
import {NButton, NCascader, NIcon, NSelect, NSwitch} from 'naive-ui';
import {Csv} from 'src/common/Csv';
import AppDraggable from 'src/components/AppDraggable/AppDraggable.vue';
import AppHistogram from 'src/components/AppHistogram/AppHistogram.vue';
import {aggregatedIndicatorsRef} from 'src/hooks/useAggregatedIndicators';
import {sitesRef} from 'src/hooks/useSites';
import {convertTimestampToDateShort} from 'src/utils/convert-timestamp-to-date-short';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {computed, ref, watch} from 'vue';

import {cyclingScaleRef} from '../Scatter/useScatterColorScale';
import {indicatorDataRef, useIndicators} from './useIndicators';

const {selectIndicator, selectSites} = useIndicators();

const parseIndex = (optionString: string | null): number | null => {
  if (optionString === null) {
    return null;
  }

  const stringElements = optionString.split(' ');
  return Number(stringElements[0]);
};

const indicatorsOptionsRef = computed(() => {
  if (aggregatedIndicatorsRef.value === null) {
    return [];
  }

  const options = aggregatedIndicatorsRef.value.map(
    (i) => `${i.extractor.index} - ${i.extractor.name}`,
  );

  return convertToNaiveSelectOptions(options);
});

const indicatorSelectedRef = ref<string>('');
watch(indicatorSelectedRef, () =>
  selectIndicator(parseIndex(indicatorSelectedRef.value)),
);

const sitesSelectedRef = ref([]);
const sitesOptionsRef = computed(() => {
  if (sitesRef.value === null) {
    return [];
  }

  const names = sitesRef.value.map((s) => s.name);
  return convertToNaiveSelectOptions(names);
});

const updateSites = (sitesNames: string[]) => {
  selectSites(sitesNames);
};

const isByDateRef = ref<boolean>(false);

interface ChartData {
  values: number[];
  labels: string[];
  colors: string[];
}

const chartDataRef = computed<ChartData>(() => {
  if (cyclingScaleRef.value === null || sitesRef.value === null) {
    return {
      values: [],
      labels: [],
      colors: [],
    };
  }

  const values = indicatorDataRef.value.map((d) => d.values[0]);
  const timestamps = indicatorDataRef.value.map((d) => d.timestamp);
  const sites = indicatorDataRef.value.map((d) => d.site);

  const sitesNames = sitesRef.value.map((site) => site.name);
  const scale = cyclingScaleRef.value.colors(sitesNames.length + 1);

  const colors = indicatorDataRef.value.map(
    (d) => scale[sitesNames.indexOf(d.site)],
  );

  if (isByDateRef.value === false) {
    return {
      values: values,
      labels: timestamps.map(
        (t, i) =>
          `${convertTimestampToDateShort(t)}<br>Site: ${
            sites[i]
          }<br>Interval: ${i}`,
      ),
      colors: colors,
    };
  }

  // sort
  const indices = Array.from({length: timestamps.length}, (_, i) => i);
  indices.sort((a, b) => timestamps[a] - timestamps[b]);

  return {
    values: indices.map((i) => values[i]),
    labels: indices.map(
      (i) =>
        `${convertTimestampToDateShort(timestamps[i])}<br>Site: ${
          sites[i]
        }<br>Interval: ${i}`,
    ),
    colors: indices.map((i) => colors[i]),
  };
});

const handleExportClick = () => {
  console.log('export', indicatorDataRef.value);

  const csv = new Csv();
  csv.addColumn('intervalIndex');
  csv.addColumn('site');
  csv.addColumn('timestamp');
  csv.addColumn('values');

  for (const d of indicatorDataRef.value) {
    csv.createRow();
    csv.addToCurrentRow(d.index.toString());
    csv.addToCurrentRow(d.site);
    csv.addToCurrentRow(d.timestamp.toString());
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
          placeholder="Indicator..."
          size="small"
          class="sites"
        />

        <n-cascader
          v-model:value="sitesSelectedRef"
          multiple
          placeholder="Select sites"
          clearable
          max-tag-count="responsive"
          expand-trigger="click"
          :options="sitesOptionsRef"
          :cascade="false"
          check-strategy="child"
          :show-path="false"
          :filterable="true"
          :clear-filter-after-select="false"
          @update:value="updateSites"
          size="small"
          class="cascader"
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

      <AppHistogram
        :values="chartDataRef.values"
        :labels="chartDataRef.labels"
        :colors="chartDataRef.colors"
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
