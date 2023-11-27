import chroma, {type Scale} from 'chroma-js';
import {aggregatedLabelsRef} from 'src/hooks/useAggregatedLabels';
import {aggregatedTimestampsRef} from 'src/hooks/useAggregatedTimestamps';
import {filesRef} from 'src/hooks/useFiles';
import {
  labelsPropertiesAsColorTypesRef,
  labelsSetsRef,
} from 'src/hooks/useLabels';
import {computed, reactive, watch} from 'vue';

import {colorsStore} from '../Colors/colorsStore';
import {useColorByCyclingDay} from '../Colors/useColorByCyclingDay';
import {useColorByDay} from '../Colors/useColorByDay';
import {useColorByLabel} from '../Colors/useColorByLabel';
import {useColorByOneHour} from '../Colors/useColorByOneHour';
import {useColorByPointIndex} from '../Colors/useColorByPointIndex';
import {useColorByTenMinutes} from '../Colors/useColorByTenMinutes';
import {useScatterTraces} from './useScatterTraces';

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
  const {getColorByPointIndex} = useColorByPointIndex();
  const {getColorByOneHour} = useColorByOneHour();
  const {getColorByTenMinutes} = useColorByTenMinutes();
  const {getColorByDay} = useColorByDay();
  const {getColorByCyclingDay} = useColorByCyclingDay();
  const {getColorByLabel} = useColorByLabel();

  const generateColorScale = () => {
    if (
      labelsPropertiesAsColorTypesRef.value === null ||
      filesRef.value === null ||
      aggregatedTimestampsRef.value === null ||
      aggregatedLabelsRef.value === null ||
      labelsSetsRef.value === null
    ) {
      return;
    }

    const intervalsCount = aggregatedTimestampsRef.value.length;

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
        const timestamp = aggregatedTimestampsRef.value[intervalIndex];
        color = getColorByOneHour(timestamp);
      } else if (colorType === 'by10min') {
        const timestamp = aggregatedTimestampsRef.value[intervalIndex];
        color = getColorByTenMinutes(timestamp);
      } else if (colorType === 'isDay') {
        const timestamp = aggregatedTimestampsRef.value[intervalIndex];
        color = getColorByDay(timestamp);
      } else if (colorType === 'cycleDay') {
        const timestamp = aggregatedTimestampsRef.value[intervalIndex];
        color = getColorByCyclingDay(timestamp);
      } else if (labelsPropertiesAsColorTypesRef.value.includes(colorType)) {
        color = getColorByLabel(
          intervalIndex,
          colorType,
          labelsPropertiesAsColorTypesRef.value,
          aggregatedLabelsRef.value,
          labelsSetsRef.value,
        );
      }

      colorScale.push(color);
    }

    colorScaleRef.value = colorScale;
    // notify('success', 'Colors', `${colorType} color scale generated`);
  };

  const {renderTraces} = useScatterTraces();
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
