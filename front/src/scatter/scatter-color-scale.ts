import chroma, {type Scale} from 'chroma-js';
import {useStorageAggregatedLabels} from 'src/composables/storage-aggregated-labels';
import {useStorageAggregatedTimestamps} from 'src/composables/storage-aggregated-timestamps';
import {useStorageFiles} from 'src/composables/storage-files';
import {useStorageLabels} from 'src/composables/storage-labels';
import {useColorBy1h} from 'src/draggables/colors/color-by-1h';
import {useColorBy10min} from 'src/draggables/colors/color-by-10min';
import {useColorByCyclingDay} from 'src/draggables/colors/color-by-cycling-day';
import {useColorByDay} from 'src/draggables/colors/color-by-day';
import {useColorByLabel} from 'src/draggables/colors/color-by-label';
import {useColorByPointIndex} from 'src/draggables/colors/color-by-point-index';
import {colorsStore} from 'src/draggables/colors/colors-store';
import {useScatterTraces} from 'src/scatter/scatter-traces';
import {computed, reactive, watch} from 'vue';

interface AlphaLowRef {
  value: number;
}

export const alphaLowRef = reactive<AlphaLowRef>({
  value: 0.005,
});

interface AlphaHighRef {
  value: number;
}

export const alphaHighRef = reactive<AlphaHighRef>({
  value: 0.8,
});

interface ColorScaleRef {
  value: string[] | null;
}

export const colorScaleRef = reactive<ColorScaleRef>({
  value: null,
});

export const chromaScaleRef = computed<Scale>(() => {
  return chroma.scale(colorsStore.colorScale).domain([0, 1]).mode('hsl');
});

export const cyclingScaleRef = computed<Scale>(() => {
  return chroma
    .scale(['blue', 'cyan', 'green', 'yellow', 'orange', 'red', 'blue'])
    .mode('hsl');
});

export const dayColor = chroma('orange');
export const nightColor = chroma('blue');

export function useScatterColorScale() {
  const {files} = useStorageFiles();
  const {labelsSets, labelsPropertiesAsColorTypes} = useStorageLabels();
  const {aggregatedLabels} = useStorageAggregatedLabels();
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();
  const {getColorByPointIndex} = useColorByPointIndex();
  const {getColorByOneHour} = useColorBy1h();
  const {getColorByTenMinutes} = useColorBy10min();
  const {getColorByDay} = useColorByDay();
  const {getColorByCyclingDay} = useColorByCyclingDay();
  const {getColorByLabel} = useColorByLabel();

  const generateColorScale = () => {
    if (
      labelsPropertiesAsColorTypes.value === null ||
      files.value === null ||
      aggregatedTimestamps.value === null ||
      aggregatedLabels.value === null ||
      labelsSets.value === null
    ) {
      return;
    }

    const intervalsCount = aggregatedTimestamps.value.length;

    const colorScale = [];
    const colorType = colorsStore.colorType;

    for (
      let intervalIndex = 0;
      intervalIndex < intervalsCount;
      intervalIndex += 1
    ) {
      let color = '';

      if (colorType === 'intervalIndex') {
        color = getColorByPointIndex(intervalIndex, intervalsCount);
      } else if (colorType === 'by1h') {
        const timestamp = aggregatedTimestamps.value[intervalIndex];
        color = getColorByOneHour(timestamp);
      } else if (colorType === 'by10min') {
        const timestamp = aggregatedTimestamps.value[intervalIndex];
        color = getColorByTenMinutes(timestamp);
      } else if (colorType === 'isDay') {
        const timestamp = aggregatedTimestamps.value[intervalIndex];
        color = getColorByDay(timestamp);
      } else if (colorType === 'cycleDay') {
        const timestamp = aggregatedTimestamps.value[intervalIndex];
        color = getColorByCyclingDay(timestamp);
      } else if (labelsPropertiesAsColorTypes.value.includes(colorType)) {
        color = getColorByLabel(
          intervalIndex,
          colorType,
          labelsPropertiesAsColorTypes.value,
          aggregatedLabels.value,
          labelsSets.value,
        );
      }

      colorScale.push(color);
    }

    colorScaleRef.value = colorScale;
  };

  const {renderTraces} = useScatterTraces();
  // TODO: Add settingsStore.applyTimezone (needs extraction). Probably make a hook to add watchers
  watch([colorsStore, alphaHighRef, alphaLowRef], () => {
    generateColorScale();
    renderTraces();
  });

  const resetColorScale = () => {
    colorScaleRef.value = null;
  };

  return {
    generateColorScale: generateColorScale,
    resetColorScale: resetColorScale,
  };
}
