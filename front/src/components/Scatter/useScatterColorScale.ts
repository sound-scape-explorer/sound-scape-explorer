import chroma, {type Color, type Scale} from 'chroma-js';
import {aggregatedLabelsRef} from 'src/hooks/useAggregatedLabels';
import {aggregatedTimestampsRef} from 'src/hooks/useAggregatedTimestamps';
import {filesRef} from 'src/hooks/useFiles';
import {metaPropertiesAsColorTypesRef} from 'src/hooks/useStorageMetaProperties';
import {metaSetsRef} from 'src/hooks/useStorageMetaSets';
import {computed, reactive, watchEffect} from 'vue';

import {colorsStore} from '../Colors/colorsStore';
import {useColorByCyclingDay} from '../Colors/useColorByCyclingDay';
import {useColorByDay} from '../Colors/useColorByDay';
import {useColorByMeta} from '../Colors/useColorByMeta';
import {useColorByOneHour} from '../Colors/useColorByOneHour';
import {useColorByPointIndex} from '../Colors/useColorByPointIndex';
import {useColorByTenMinutes} from '../Colors/useColorByTenMinutes';

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

export const chromaScaleRef = computed<Scale<Color>>(() => {
  return chroma.scale(colorsStore.colorScale).domain([0, 1]).mode('hsl');
});

export const cyclingScaleRef = computed<Scale<Color>>(() => {
  return chroma
    .scale(['blue', 'green', 'yellow', 'orange', 'yellow', 'red', 'blue'])
    .domain([0, 1])
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
  const {getColorByMeta} = useColorByMeta();

  const readColorScale = () => {
    if (
      metaPropertiesAsColorTypesRef.value === null ||
      filesRef.value === null ||
      aggregatedTimestampsRef.value === null ||
      aggregatedLabelsRef.value === null ||
      metaSetsRef.value === null
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

      if (colorType === 'pointIndex') {
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
      } else if (metaPropertiesAsColorTypesRef.value.includes(colorType)) {
        color = getColorByMeta(
          intervalIndex,
          colorType,
          metaPropertiesAsColorTypesRef.value,
          aggregatedLabelsRef.value,
          metaSetsRef.value,
        );
      }

      colorScale.push(color);
    }

    colorScaleRef.value = colorScale;
    console.log('generate color scale');
  };

  watchEffect(readColorScale);
}
